# 📚 Resources:

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
* Tag Schema - how do I update individual attributes of a Document??
  * This is the better, more authentically backend-y way of solving this issue lmao

### Backlog
1. On tagged-entries, a section of the average rating for that tag
1. updatedAt, createdAt timestamps using the actual time/date a la Reddit/BigMood
1. Tracking productivity day-by-day - clickable points where you can click to the entry (or get a small pop-up) and see RATING & TAGS (**omg data visualization??** 😱)
1. Auth a la Reddit
1. Navbar a la Reddit
1. Deleting an entry should delete its tags from the allTags array

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
