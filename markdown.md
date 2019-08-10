# 📚 Resources:

### 🤩 Sorting a Dictionary/Object Based on Value
* https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript

### ⁉️ Updating Documents
* https://mongoosejs.com/docs/documents.html#updating
* https://stackoverflow.com/questions/18349650/how-to-use-documentupdate-in-mongoose
* https://stackoverflow.com/questions/40466323/mongoose-model-update-only-update-provided-values
* https://stackoverflow.com/questions/30398698/how-to-access-model-attribute-in-jquery
* https://www.digitalocean.com/community/tutorials/how-to-modify-attributes-classes-and-styles-in-the-dom
* https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/

### ⁉️ Populating
* https://medium.com/@nicknauert/mongooses-model-populate-b844ae6d1ee7
* https://mongoosejs.com/docs/populate.html

### ⁉️ Lol
* https://medium.com/omarelgabrys-blog/database-modeling-entity-relationship-diagram-part-5-352c5a8859e5
* https://coursework.vschool.io/mongoose-schemas/

### Unorganized stuff (organize later pls)
* https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373
* https://zellwk.com/blog/looping-through-js-objects/
* https://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
* https://www.w3schools.com/jsref/jsref_unshift.asp
* https://stackoverflow.com/questions/29820791/git-ignore-node-modules-folder-everywhere

---

# ❤️ Current

### Left off here
* Delete an entry --> delete its associated Tag documents & its Rating document

### Backlog
1. Auth a la Reddit
1. updatedAt, createdAt timestamps using the actual time/date a la Reddit/BigMood
1. Tracking productivity day-by-day - clickable points where you can click to the entry (or get a small pop-up) and see RATING & TAGS (**omg data visualization??** 😱) -- There's that book!!!!
1. Navbar a la Reddit
1. Cut comments
1. Change ```tagsString``` to ```tagsArray``` (PUSH LIVE FIRST, THEN TRY TO FIX THIS, AND IF IT WORKS, THEN PUSH THAT WORKING FIX. THIS IS THE LAST PRIORITY. LAST! **LAST** PRIORITY!!!! I MEAN IT)

### Time permitting
1. Change auth to OAuth or passport
1. Better styling - DIV CLASS (a la Reddit) on forms

### Would be MAJOR CHANGES so ONLY do if time REALLY permits
1. Edit comments
1. Switch from handlebars to something else (maybe. *maybemaybemaybemaybe*)

---

# 📺 Old Stuff - not using

* https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating/17368101#17368101
* https://stackoverflow.com/questions/17035297/getting-schema-attributes-from-mongoose-model
* At some point I said "try unshift, not push"
* Not using this lol:
```
      function helpMe (thingToAdd) {
        var allTags = []
        var count = []
        var i = 0
        for (tag in thingToAdd) {
          if (tag in count) {
            count[allTags[tag]] = count[allTags[tag]] + 1
          } else {
            allTags.extend(tag)
            count.extend(1)
          }
        }
        for (tag in allTags) {
          dict.extend((allTags[i], count[i]))
          i = i + 1
        }
        return dict
      }
```
*       // entry.title = new Date();
* Aaand not using this (originally shoved into ```rated-entries.handlebars```):
```
<script>
  //Gotta pass in an object
  function returnStuff(entries) {
    allTags = {} //object/"array" for ALL tags of ALL entries
    display5 = {} //object/"array" for top 5 tags of this rating

    //get object size https://stackoverflow.com/questions/5223/length-of-a-javascript-object
    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size ++;
      } return size;
    }

    //Create array for ALL tags EVER
    for (const entry_object in entries) {
      const tags_attribute = entry_object['tags']
      for (const tag in tags_attribute) {
        if (tag in allTags) {
          allTags[tag] += 1
        } else {
          allTags[tag] = 1
        }
      }
    }.catch(err => {console.log(err.message)})

    for (key, value in allTags) {
      if (Object.size(display5) == 5) {
        keys = Object.keys(display5) //create array of keys
        display5 = keys.sort(function(a, b) { return display5[a] - display5[b] }) //sort ascending
        for (key2, value2 in display5) {
          i = 0
          while (i < 6) { //or, while (i < (Object.size(display5) + 1))
            if (value > value2) {
              delete display5[0] //delete first element of sorted array
              display5[key] = value //and plop this in
              i += 1 //increase counter so as to iterate thru display5
            }
          }
        }
      } else if ((Object.size(display5) < 5) { //does this include when it's empty?? I think yes
        for (key2, value2 in display5) {
          display5[key] = value
        }
      }
    }.catch(err => {console.log(err.message)})
    
    return display5
  }
</script>
```
* Not using this anymore either:
```
  // Post/Create (actually generate the entry)
  app.post('/entries', (req, res) => {
    // console.log(req.body)
    Entry.create(req.body).then((entry) => { //⁉️ASYNC HERE ASYNC HERE!
      // console.log(entry)
      parsedList = req.body.tagsString.split(", ") //parses string to an array
      entry.tags = parsedList //updates entry.tags to = now-parsed stuff
      // console.log(entry)
      entry.save()

      // for (const eachTag of entry.tags) {
      //   const findTag = await Tag.find({ tagName: eachTag }).limit(1)
      //   console.log(typeof findTag)
      //   console.log(findTag.length)

      //   //Check for existing Tag model whose tagName = eachTag
      //   console.log('before')
      //   //find, then .catch!!!!
      //   Tag.find({tagName: eachTag}).then(tag => {
      //     console.log(tag)
      //   }).catch() //catch - could not find, doesn't exist, let's make a new Tag document

        // if ((Tag.exists({tagName: eachTag})) == true) { //it exists
        //   console.log(eachTag)
        //   Tag.find({tagName: eachTag}).then(tag => {
        //     //pseudo: Update foundTag.timesUsed so timesUsed += 1
        //     //pseudo: Append createdEntry's rating to foundTag.allRatings
        //     //pseudo: Recalculate foundTag.avgRating ([ratings sum]/[length of foundTag.allRatings])
        //   })
        // } else { //it does not exist

        // }
      // }

      res.redirect(`/entries/${entry._id}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })
```