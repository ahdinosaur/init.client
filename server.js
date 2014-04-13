var http = require('http');
var connect = require('connect');
var ecstatic = require('ecstatic');

var isProd = (process.env.NODE_ENV === 'production');

var app = connect()
  .use(require('morgan')())
  .use(require('compression')())
  .use(ecstatic({
    root: __dirname,
    cache: (isProd ? 3600 : 0),
  }));

http.createServer(app).listen(5000);

module.exports = app;
