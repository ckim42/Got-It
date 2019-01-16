// init
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();

// middleware
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

// models
const Entry = require('./models/entry');
const Comment = require('./models/comment');

// controllers
const entries = require('./controllers/entries');
const comments = require('./controllers/comments');
entries(app);
comments(app);

const port = process.env.PORT || 5000
// mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost.27017/got_it"; mongoose.connect(mongoUri, { useNewUrlParser: true } );

// web server check
app.listen(port, () => {
  console.log('App listening on port 5000!')
});

module.exports = app;
