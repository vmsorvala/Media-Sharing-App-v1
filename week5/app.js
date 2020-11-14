'use strict';
require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');

const sslkey = fs.readFileSync('../week2/ssl-key.pem');
const sslcert = fs.readFileSync('../week2/ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};

const app = express();

app.enable('trust proxy');

// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
// https://github.com/aerwin/https-redirect-demo/blob/master/server.js


app.use ((req, res, next) => {
  console.dir(req.protocol === 'https')
// => true

  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // if express app run under proxy with sub path URL
    // e.g. http://www.myserver.com/app/
    // then, in your .env, set PROXY_PASS=/app
    // Adapt to your proxy settings!
    const proxypath = process.env.PROXY_PASS || ''
    // request was via http, so redirect to https
    res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
  }
});

//https.createServer(options, app).listen(8000);
module.exports = (app, httpsPort, httpPort) => {
  https.createServer(options, app).listen(httpsPort);
  http.createServer(httpsRedirect).listen(httpPort);
 };
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('production')(app, process.env.PORT);
} else {
  require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}
app.get('/', (req, res) => {
  res.send('Hello Secure World!');
}); 

app.listen(3000);