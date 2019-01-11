// init
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();

// middleware
mongoose.connect('mongodb://localhost/got-it');
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

// models
const Entry = require('./models/entry');
const Comment = require('./models/comment');

// controllers
const entries = require('./controllers/entries');
entries(app);
const comments = require('./controllers/comments');
comments(app);

// check web server
app.listen(3000, () => {
  console.log('App listening on port 3000!')
});

module.exports = app;



// GARBAGE CODE
