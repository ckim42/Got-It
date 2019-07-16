// try unshift, not push
// does it work, having maps1-5 outside of module.exports?

const Entry = require('../models/entry')
const Comment = require('../models/comment')

// create maps, one map per rating, to hold (tag, # of entries with that tag) as (key, val) pair
// I believe these should be global??
const map1 = new Map()
// const map2 = new Map()
// const map3 = new Map()
// const map4 = new Map()
// const map5 = new Map()

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
  app.post('/entries', (req, res) => {
    Entry.create(req.body).then((entry) => {
      parsedList = req.body.tagsString.split(", ") //string parsing to an array
      entry.tags = parsedList //updates entry.tags to = now-parsed stuff
      if (req.body.rating == 1) {
        for (const tag of parsedList) {
          if (map1.has(tag) == false) { //tag is not yet in map1 - add it!
            map1.set(tag, 1)
            console.log(map1)
          }
          else if (map1.has(tag) == true) { //tag IS in map1 - add 1 to the value
            map1.set(tag, (map1.get(tag))+1)
            console.log(map1)
          }
        }
      // } else if (req.body.rating == 2) {
      //   allTags2.extend(parsedList)
      // } else if (req.body.rating == 3) {
      //   allTags3.extend(parsedList)
      // } else if (req.body.rating == 4) {
      //   allTags4.extend(parsedList)
      // } else if (req.body.rating == 5) {
      //   allTags5.extend(parsedList)
      } else {
        console.log(err)
      }
      // console.log(allTags1)
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
    
    dict = [] //array to hold tags & quantities of appearance as key:val pairs
    Entry.find({
      rating: req.params.rating
    }).then(entries => {
      // function helpMe (thingToAdd) {
      //   var allTags = []
      //   var count = []
      //   var i = 0
      //   for (tag in thingToAdd) {
      //     if (tag in count) {
      //       count[allTags[tag]] = count[allTags[tag]] + 1
      //     } else {
      //       allTags.extend(tag)
      //       count.extend(1)
      //     }
      //   }
      //   for (tag in allTags) {
      //     dict.extend((allTags[i], count[i]))
      //     i = i + 1
      //   }
      //   return dict
      // }
      // if (req.params.rating == 1) {
      //   helpMe(allTags1)
      // } else if (req.params.rating == 2) {
      //   helpMe(allTags2)
      // } else if (req.params.rating == 3) {
      //   helpMe(allTags3)
      // } else if (req.params.rating == 4) {
      //   helpMe(allTags4)
      // } else if (req.params.rating == 5) {
      //   helpMe(allTags5)
      // } else {
      //   console.log(err)
      // }
      // console.log(dict)
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