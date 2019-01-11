const Entry = require('../models/entry');
const express = require('express');
const app = express();

module.exports = function(app, entry) {

  // root route. redirects to /entries
  // CHANGE LATER WE DO NOT WANT THIS TO BE THE DEFAULT IN THE END
  app.get('/', (req, res) => {
    res.redirect('/entries')
  })

  // Index/Read
  app.get('/entries', (req, res) => {
    Entry.find().then(entries => {
      res.render('entries-index', { entries: entries });
    }).catch(err => {
      console.log(err);
    });
  })

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

  // Edit
  app.get('/entries/:id/edit', (req, res) => {
    Entry.findById(req.params.id, function(err, entry) {
      res.render('entries-edit', { entry: entry });
    })
  })

  // Update
  app.put('/entries/:id', (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body)
      .then(entry => {
        res.redirect(`/entries/${entry._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // Delete
  app.delete('/entries/:id', function (req, res) {
    console.log("DELETE entry")
    Entry.findByIdAndRemove(req.params.id).then((entry) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })


}
