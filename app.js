// init
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// middleware
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/got-it');
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port);

// models
const Entry = require('./models/entry');
const Comment = require('./models/comment');

// controllers
const entries = require('./controllers/entries');
entries(app);
const comments = require('./controllers/comments');
comments(app);

module.exports = app;



// GARBAGE CODE
