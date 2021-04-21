var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

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
app.use('/api/admin', adminRouter);

module.exports = app;
