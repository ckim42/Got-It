const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    tagName: { type: String, required: true },
    timesUsed: { type: Number, required: true },
    allRatings: [{ type: Number }], //array of all ratings, ever
    avgRating: { type: Number }
})

module.exports = mongoose.model('Tag', TagSchema)

/*
Current thinking:

- New entry created == new TAG(S) also created!
- Tag DOES exist??
    - Find the document with the same TagName
    - Add +1 to "timesUsed" attribute
    - Append the new entry's rating to "allRatings" attribute (fyi it's an array)
    - Recalculate "avgRating" attribute
- Tag DOES NOT exist??
    - Make a new document with this tag being used as the tagName
    - Set "timesUsed" = 1
    - Append the new entry's rating to "allRatings" attribute (fyi it's an array)
    - Set "avgRating" = new entry's rating


*/