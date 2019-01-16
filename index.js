// init
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const index = express();

// middleware
index.engine('handlebars', exphbs({ defaultLayout: 'main' }));
index.set('view engine', 'handlebars');
index.use(bodyParser.urlencoded({ extended: true }));

// models
const Entry = require('./models/entry');
const Comment = require('./models/comment');

// controllers
const entries = require('./controllers/entries');
const comments = require('./controllers/comments');
entries(index);
comments(index);

const port = process.env.PORT || 3000;
// mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/got-it";
mongoose.connect(mongoUri, { useNewUrlParser: true } );

// web server check
index.listen(port, () => {
  console.log(`Running Got_It on port ${port}`);
});

module.exports = index;
