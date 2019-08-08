const Entry = require('../models/entry')
const Comment = require('../models/comment')
const Tag = require('../models/tag')

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
 
  // Post/Create (actually generate the entry)
  // ❌ DON'T TOUCH THIS IT'S WORKING AS IS
  app.post('/entries', (req, res) => {
    Entry.create(req.body).then((entry) => {
      const entryRating = entry.rating //pass in when making Tag documents
      const entryId = entry._id //pass in when making Tag documents
      parsedList = req.body.tagsString.split(", ") //parses string to an array
      entry.tagsString = parsedList //updates entry.tags to = now-parsed stuff
      entry.save()
      for (const tag of parsedList) { //iterate thru array
        Tag.create({ tagName: tag, tagRating: entryRating, entryId: entryId })
      }
      res.redirect(`/entries/${entry._id}`)
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
    Entry.find({ tagsString: { $all: [req.params.tag] } })
      .then(async entries => { //staggered stuff not all at once = async
        const tagHunt = await Tag.find({ tagName: req.params.tag }).then(tags => { //await the thing we need to continue
          let addedRatings = 0 //this number isn't fixed
          let averageRating = 0 //ditto
          const numEntries = tags.length //this number IS fixed
          for (const tag of tags) {
            addedRatings += tag.tagRating
          }
          averageRating = addedRatings / numEntries
          return averageRating
        })
      res.render('tagged-entries', { entries: entries, tag: req.params.tag, average: tagHunt });
      console.log(tagHunt)
    }).catch(err => {
      console.log(err.message);
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