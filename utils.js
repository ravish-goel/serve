
const parseCookies = (request) => {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const fillArrayWithTrueValues = (arr, obj) => {
    Object.keys(obj).map(key => {
        if(obj[key]){
          arr.push(key)
        }
    })
}

const removeFromArray = (array, item) => {
    var index = array.indexOf(item);
    if (index !== -1) array.splice(index, 1);
}

module.exports = {
    parseCookies: parseCookies,
    removeFromArray: removeFromArray,
    fillArrayWithTrueValues: fillArrayWithTrueValues,
    url: 'https://serve123.herokuapp.com' //http://localhost:3000
}