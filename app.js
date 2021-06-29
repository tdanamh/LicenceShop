var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var propertiesRouter = require('./routes/properties');
var bookPropertyRouter = require('./routes/bookProperty');
var adminRouter = require('./routes/admin');

var app = express();

app.use('/', express.static('FE/dist/FE'));

// Databse config
const db = require('./config/keys').mongoURI;
// Connect to Database
mongoose.connect(db,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected."))
.catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/bookProperty', bookPropertyRouter);
app.use('/api/admin', adminRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'FE/dist/FE/index.html'))
})

app.use(favicon(path.join(__dirname,'FE','dist', 'FE','favicon.ico')));

module.exports = app;
