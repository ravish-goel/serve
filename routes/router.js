var express = require("express");
import App from "../src/components/app";
import Login from "../src/components/login";
import React from "react";
import { renderToString } from "react-dom/server";
import hbs from "handlebars";

const router = express.Router();

router.get("/app", async (req, res) => {
  const theHtml = `
  <html>
  <head><title>Rick and Morty</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/app.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});

router.get("/login", async (req, res) => {
  const theHtml = `
  <html>
  <head><title>Rick and Morty</title></head>
  <body>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/login.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<Login />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});

module.exports = router;