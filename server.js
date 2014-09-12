var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var connect = require('connect');
var request = require('request');


/* predeclaring functions */



/* end of predeclarations */

/* setup static routes */



app.use("css", express.static('./css'));
app.use('lib/', express.static('./lib/'));
app.use('lib/js', express.static('./lib/js'));
app.use('lib/css', express.static('./lib/css'));
app.use("js", express.static('./js'));
app.use("img", express.static('./img'));
app.use("/", express.static('./'));



/* End functions for routes */

/*
  To Run server on port 3000:
    node server.py
  Run server on port 80:
    node server.py prod
 */
var env = process.argv[2] || 'dev';
var port = (env == 'prod') ? 80 : 3000;
console.log('Listening on ' + port);
server.listen(port);