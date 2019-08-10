const Entry = require('../models/entry')
const Comment = require('../models/comment')
const Tag = require('../models/tag')
const Rating = require('../models/rating')

module.exports = (app) => {

  // root route. redirects to home
  app.get('/', (req, res) => {res.render('home', {})})

  // Index/Read
  app.get('/entries', (req, res) => {
    Entry.find().then(entries => {
      res.render('entries-index', { entries: entries })
    }).catch(err => {console.log(err.message)})
  })

  // New/Create (1 new entry template)
  app.get('/entries/new', (req, res) => {res.render('entries-new')})
 
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
      res.redirect(`/entries/${entry._id}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Show/Read
  app.get('/entries/:id', (req, res) => {
    Entry.findById(req.params.id).then(entry => {
      Comment.find({entryId: req.params.id})
        .then(comments => { res.render('entries-show', { entry: entry, comments: comments }) })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Index/Read - for all entries w/ same TAG
  // ❌ 만지지마!!!!
  app.get('/tags/:tag', (req, res) => {
    Entry.find({tagsString: {$all: [req.params.tag]}})
      .then(async entries => { //staggered stuff not all at once = async
        const tagHunt = await Tag.find({tagName: req.params.tag}).then(tags => { //await the thing we need to continue
          let addedRatings = 0 //this number isn't fixed
          let averageRating = 0 //ditto
          const numEntries = tags.length //this number IS fixed
          for (const tag of tags) {addedRatings += tag.tagRating}
          averageRating = addedRatings / numEntries
          return averageRating
        })
      res.render('tagged-entries', {entries: entries, tag: req.params.tag, average: tagHunt})
    }).catch(err => {console.log(err.message)})
  })

  // Index/Read - for all entries w/ same RATING
  app.get('/ratings/:rating', (req, res) => {
    Entry.find({rating: req.params.rating})
      .then(async entries => {
        const ratingHunt = await Rating.find({ratingNum: req.params.rating}).then(ratings => {
          let allTags = []
          let tagsDict = {}
          let placeHold = []
          let topTags = []
          for (const rating of ratings) {
            for (const tag of rating.tagsUsed) {allTags.push(tag)}
          }
          for (const tag of allTags) {
            if (tag in tagsDict) {tagsDict[tag] += 1} else {tagsDict[tag] = 1}
          }
          for (const key in tagsDict) {
            if (tagsDict.hasOwnProperty(key)) {placeHold.push([key, tagsDict[key]])}
          }
          placeHold.sort(function(a, b) {return b[1] - a[1]})
          if (placeHold.length == 0) {
            console.log('Uhm looks like you\'re doing something wrong there')
          } else if (placeHold.length == 1) {
            topTags.push(placeHold[0][0])
          } else if (placeHold.length == 2) {
            topTags.push(placeHold[0][0])
            topTags.push(placeHold[1][0])
          } else {
            topTags.push(placeHold[0][0])
            topTags.push(placeHold[1][0])
            topTags.push(placeHold[2][0])
          }
          return topTags
        })
      res.render('rated-entries', {entries: entries, rating: req.params.rating, topThreeTags: ratingHunt})
    }).catch(err => {console.log(err.message)})
  })

  // Edit
  app.get('/entries/:id/edit', (req, res) => {
    Entry.findById(req.params.id, function (err, entry) {
      res.render('entries-edit', {entry: entry})
    })
  })

  // Update
  app.put('/entries/:id', (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body)
      .then(entry => {res.redirect(`/entries/${entry._id}`)})
      .catch(err => {console.log(err.message)})
  })

  // Delete/Destroy
  app.delete('/entries/:id', (req, res) => {
    console.log("DELETE entry")
    //These don't work but they also don't throw errors. Must fix
    // Tag.deleteMany({entryId: req.params.id})
    // Rating.deleteMany({entryId: req.params.id})
    Entry.findByIdAndRemove(req.params.id).then((entry) => {
      res.redirect('/entries')
    }).catch((err) => {console.log(err.message)})
  })

}