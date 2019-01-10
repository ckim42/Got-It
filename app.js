const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/got-it');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const Entry = mongoose.model('Entry', {
  title: String,
  rating: String,
})

Entry.find()
  .then(review => {
  })
  .catch(err => {
  });

// // DUMMY ENTRY
let entries = [
  { title: "01/01/2019", rating: "5/5"},
  { title: "01/02/2019", rating: "4/5"}
]

// // root route
// app.get('/', (req, res) => {
//   res.render('home', { msg: 'Handlebars are Cool!' });
// })

// Index/Read
app.get('/', (req, res) => {
  res.render('entries-index', { entries: entries });
})

// Index/Read
// app.get('/', (req, res) => {
//   Entry.find().then(entries => {
//       res.render('entries-index', { entries: entries });
//     }).catch(err => {
//       console.log(err);
//     })
// })

// New/Create (1 new entry template)
app.get('/entries/new', (req, res) => {
  res.render('entries-new', {});
})

// Post/Create
app.post('/entries', (req, res) => {
  Entry.create(req.body).then((entry) => {
    console.log(entry)
    // res.redirect(`/entries/${entry._id}`)
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message)
  })
})

// Show
app.get('/entries/:id', (req, res) => {
  Entry.findById(req.params.id).then((entry) => {
    res.render('entries-show', { entry: entry })
  }).catch((err) => {
    console.log(err.message);
  })
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})



// GARBAGE CODE
