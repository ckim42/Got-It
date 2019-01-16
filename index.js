// init
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();

// middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/got-it";
mongoose.connect(mongoUri, { useNewUrlParser: true } );

// controllers
const entries = require('./controllers/entries');
const comments = require('./controllers/comments');
entries(app);
comments(app);

const PORT = process.env.PORT || 3000;


// web server check
app.listen(PORT, () => {
  console.log(`Running Got_It on port ${PORT}`);
});

// module.exports = app;
