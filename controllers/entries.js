const Entry = require('../models/entry')
const Comment = require('../models/comment')

module.exports = (app) => {

  // root route. redirects to home
  app.get('/', (req, res) => {
    res.render('home', {})
  })

  // Index/Read
  app.get('/entries', (req, res) => {
    Entry.find().then(entries => {
      res.render('entries-index', {
        entries: entries
      })
    }).catch(err => {
      console.log(err.message)
    })
  })

  // New/Create (1 new entry template)
  app.get('/entries/new', (req, res) => {
    res.render('entries-new')
  })

  // Post/Create (actually generate the thing)
  //❌DON'T DO ANYTHING ELSE HERE! LEAVE IT ALONE! NO MORE!!!
  app.post('/entries', (req, res) => {
    Entry.create(req.body).then((entry) => {
      parsedList = req.body.tagsString.split(", ") //parses string to an array
      entry.tags = parsedList //updates entry.tags to = now-parsed stuff
      // entry.title = new Date();
      entry.save()
      res.redirect(`/entries/${entry._id}`)
      // res.redirect('/entries/' + entry._id) //if you dislike grave accents for some reason
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Show/Read
  app.get('/entries/:id', (req, res) => {
    Entry.findById(req.params.id).then(entry => {
      Comment.find({
        entryId: req.params.id
      }).then(comments => {
        res.render('entries-show', {
          entry: entry,
          comments: comments
        })
      })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Index/Read - for all entries w/ same TAG
  app.get('/tags/:tag', (req, res) => {
    Entry.find({
      tags: {
        $all: [req.params.tag]
      }
    }).then(entries => {
      res.render('tagged-entries', {
        entries: entries,
        tag: req.params.tag
      })
    }).catch(err => {
      console.log(err.message)
    })
  })

  // Index/Read - for all entries w/ same RATING
  app.get('/ratings/:rating', (req, res) => {
    Entry.find({
      rating: req.params.rating
    }).then(entries => {
      res.render('rated-entries', {
        entries: entries,
        rating: req.params.rating
      })
    }).catch(err => {
      console.log(err.message)
    })
  })

  // Edit
  app.get('/entries/:id/edit', (req, res) => {
    Entry.findById(req.params.id, function (err, entry) {
      res.render('entries-edit', {
        entry: entry
      })
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
  app.delete('/entries/:id', (req, res) => {
    console.log("DELETE entry")
    Entry.findByIdAndRemove(req.params.id).then((entry) => {
      res.redirect('/entries')
    }).catch((err) => {
      console.log(err.message)
    })
  })



}