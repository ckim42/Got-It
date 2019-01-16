// init
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const index = express();

// middleware
index.use(methodOverride('_method'))
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

const port = process.env.PORT || 5000
// mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost.27017/got_it"; mongoose.connect(mongoUri, { useNewUrlParser: true } );

// web server check
index.listen(port, () => {
  console.log('index listening on port 5000!')
});

module.exports = index;
