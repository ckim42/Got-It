const Entry = require('../models/entry');
const Comment = require('../models/comment');
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
      console.log(err.message);
    });
  })

  // New/Create (1 new entry template)
  app.get('/entries/new', (req, res) => {
    res.render('entries-new', {});
  })

  // Post/Create
  app.post('/entries', (req, res) => {
    Entry.create(req.body).then((entry) => {
      // following line: string parsing to array
      parsedList = req.body.tagsString.split(", ")
      // following line: entry.tags = now-parsed stuff
      entry.tags = parsedList
      console.log(entry)
      entry.save()
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Show/Read
  app.get('/entries/:id', (req, res) => {
    Entry.findById(req.params.id).then(entry => {
      Comment.find({ entryId: req.params.id }).then(comments => {
        res.render('entries-show', { entry: entry, comments: comments })
      })
    }).catch((err) => {
      console.log(err.message);
    });
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

  // Delete/Destroy
  app.delete('/entries/:id', function (req, res) {
    console.log("DELETE entry")
    Entry.findByIdAndRemove(req.params.id).then((entry) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

}
