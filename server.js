var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var connect = require('connect');
var request = require('request');


/* predeclaring functions */

// function to keep a active list of playlists


/* end of predeclarations */

/* setup static routes */



app.use("css", express.static('./css'));
app.use("js", express.static('./js'));
app.use("img", express.static('./img'));
app.use("/", express.static('./'));


/* setup function handlers for routes */

var listTodos = function(req, res){

};

var todoDetails = function(req, res){};

var deleteTodo = function(req, res){};
var createTodo = function(req, res){};
var updateTodo = function(req, res){};

/* End functions for routes */




app.get('/todos', listTodos);
app.get('/todos/:id', todoDetails);
app.delete('/todos/:id', deleteTodo);
app.post('/todos', createTodo);
app.put('/todos/:id', updateTodo);


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