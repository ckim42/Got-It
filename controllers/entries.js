const Entry = require('../models/entry')
const Comment = require('../models/comment')
const Tag = require('../models/tag')
const Rating = require('../models/rating')

module.exports = (app) => {

  // root route. redirects to home
  app.get('/', (req, res) => {
    res.render('home', {})
  })

  // Index/Read
  app.get('/entries', (req, res) => {
    Entry.find().then(entries => {
      res.render('entries-index', { entries: entries })
    }).catch(err => {
      console.log(err.message)
    })
  })

  // New/Create (1 new entry template)
  app.get('/entries/new', (req, res) => {
    res.render('entries-new')
  })
 
  // Post/Create (actually generate the entry)
  // ❌ DON'T TOUCH THIS. THIS ✴️ THING ✍🏼 WORKS! 💖
  app.post('/entries', (req, res) => {
    Entry.create(req.body).then((entry) => {
      const entryRating = entry.rating //pass in when making Tag documents
      const entryId = entry._id //pass in when making Tag documents
      parsedList = req.body.tagsString.split(", ") //parses string -> array
      entry.tagsString = parsedList //entry.tags now = newly parsed array
      entry.save()
      for (const tag of parsedList) { //iterate thru array
        Tag.create({ tagName: tag, tagRating: entryRating, entryId: entryId })
      }
      Rating.create({ ratingNum: entryRating, tagsUsed: parsedList, entryId: entryId})
      // console.log('Entry tags: ' + entry.tagsString)
      // console.log('parsedList array: ' + parsedList)
      res.redirect(`/entries/${entry._id}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Show/Read
  app.get('/entries/:id', (req, res) => {
    Entry.findById(req.params.id).then(entry => {
      Comment.find({ entryId: req.params.id })
        .then(comments => { res.render('entries-show', { entry: entry, comments: comments }) })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Index/Read - for all entries w/ same TAG
  // ❌ 만지지마!!!!
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
      res.render('tagged-entries', { entries: entries, tag: req.params.tag, average: tagHunt })
      // console.log(tagHunt)
    }).catch(err => {
      console.log(err.message);
    })
  })

  // 😁 super similar to the above, yo!!!
  // Index/Read - for all entries w/ same RATING
  app.get('/ratings/:rating', (req, res) => {
    Entry.find({ rating: req.params.rating })
      .then(async entries => {
        const ratingHunt = await Rating.find({ ratingNum: req.params.rating  }).then(ratings => {
          let allTags = []
          let tagsDict = {}
          // let topTags = []
          for (const rating of ratings) {
            for (const tag of rating.tagsUsed) {
              allTags.push(tag)
              for (const thing of allTags) {
                if (thing in tagsDict) {
                  tagsDict[thing] += 1 //no dot notation :( cuz it's a var
                } else {
                  tagsDict[thing] = 1
                }
              }
            }
          }
          // for (const tag of allTags) {
          //   if (tag in tagsDict) {
          //     tagsDict[tag] += 1
          //   } else {
          //     tagsDict[tag] = 1
          //   }
          // }
          return tagsDict
          // var standIn = Object.keys(tagsDict).map(function(key) { //create items array
          //   return [key, tagsDict[key]]
          // })
          // standIn.sort(function(first, second) { //sort array based on 2nd element
          //   return second[1] - first[1]
          // })
          // return standIn.slice(0, 3) //return only the first 3 items
          // // return topTags
        })
      console.log(ratingHunt)
      res.render('rated-entries', { entries: entries, rating: req.params.rating, topThreeTags: ratingHunt })
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