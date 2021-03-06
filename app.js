
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var cors = require('cors');
var app = express();

var methodOverride = require('method-override');

//skill-branch homework middlewares
var mongotest = require('./routes/mongotest');
var skb2c = require('./routes/skb2c');
var skb2d = require('./routes/skb2d');
var colors = require('./routes/colors');


app.use(cors());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}




app.get('/', routes.index);
app.get('/mongotest', mongotest.index);
app.get('/users', user.list);

//homework paths
app.get('/2c', skb2c.index);
app.get(/^\/2d(\/?.*|\/?)/, skb2d.index);
app.get('/colors', colors.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
