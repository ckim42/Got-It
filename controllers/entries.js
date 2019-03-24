const Entry = require('../models/entry')
const Comment = require('../models/comment')

module.exports = function (index) {

  // root route. redirects to home
  index.get('/', (req, res) => {
    res.render('home', {})
  })

  // Index/Read
  index.get('/entries', (req, res) => {
    Entry.find().then(entries => {
      res.render('entries-index', {
        entries: entries
      })
    }).catch(err => {
      console.log(err.message);
    })
  })

  // New/Create (1 new entry template)
  index.get('/entries/new', (req, res) => {
    res.render('entries-new')
  })

  // Post/Create
  index.post('/entries', (req, res) => {
    Entry.create(req.body).then((entry) => {
      // following line: string parsing to array
      parsedList = req.body.tagsString.split(", ")
      // following line: entry.tags = now-parsed stuff
      entry.tags = parsedList
      console.log(entry)
      // entry.title = new Date();
      entry.save()
      res.redirect('/')
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Show/Read
  index.get('/entries/:id', (req, res) => {
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
      console.log(err.message);
    })
  })

  // Index/Read - for all entries w/ same TAG
  index.get('/tags/:tag', (req, res) => {
    Entry.find({
      tags: {
        $all: [req.params.tag]
      }
    }).then(entries => {
      console.log(entries)
      res.render('tagged-entries', {
        entries: entries,
        tag: req.params.tag
      })
    }).catch(err => {
      console.log(err.message);
    })
  })

  // Index/Read - for all entries w/ same RATING
  index.get('/ratings/:rating', (req, res) => {
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
  index.get('/entries/:id/edit', (req, res) => {
    Entry.findById(req.params.id, function (err, entry) {
      res.render('entries-edit', {
        entry: entry
      })
    })
  })

  // Update
  index.put('/entries/:id', (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body)
      .then(entry => {
        res.redirect(`/entries/${entry._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // Delete/Destroy
  index.delete('/entries/:id', function (req, res) {
    console.log("DELETE entry")
    Entry.findByIdAndRemove(req.params.id).then((entry) => {
      res.redirect('/')
    }).catch((err) => {
      console.log(err.message)
    })
  })



}