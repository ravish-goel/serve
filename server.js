const express = require('express');
const compression = require('compression');
const server = require('./apollo');
const router = require('./routes/router');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var cookieParser = require('./utils').parseCookies;
const port = process.env.PORT || 3000;
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(express.static("public"));
server.applyMiddleware({ app });

app.post("/authenticate", (req, res)=>{
    if(req.body.username === 'admin' && req.body.password === 'admin'){
        var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: req.body
        }, 'foobar');
        res.writeHead(200, {
            'Set-Cookie': 'token=' + token,
            'Content-Type': 'application/json'
          });
        res.write(JSON.stringify({status: "success", redirect: "/ssr/app"}));
    }
    else{
        res.writeHead(401, {
            'Content-Type': 'application/json'
          });
        res.write(JSON.stringify({status: "failure"}))
    }
    res.end()  
})

app.use((req, res, next)=>{
    var cookieOb = cookieParser(req);
    jwt.verify(cookieOb.token, 'foobar', (err, decoded) => {
        if (err) {
            if( req.path === '/ssr/login'){
                next();
            }
            else{
                res.redirect('/ssr/login');
            }
        }
        else{
            console.log(decoded);
            if( req.path === '/ssr/login'){
                res.redirect('/ssr/app');
            }
            else{
                next();
            }
        }
    })
})

app.use("/ssr", router);

app.listen({ port: port }, () =>
  console.log('Now browse to http://localhost:3000')
);