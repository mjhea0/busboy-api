
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var _ = require('underscore');
var mongoose = require('mongoose');

var app = express();
var server = http.createServer(app);

//mongoose.connect("mongodb://localhost/rtd");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/list', api.getCollectionData);

//routing for mongo rest api
app.get('/:collection', api.findAll);
//app.get('/:collection/:id', api.findById);
app.get('/:collection/:parameter/:value', api.findByParameter);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
