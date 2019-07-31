const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    tagName: { type: String, required: true },
    timesUsed: { type: Number, required: true },
    allRatings: [{ type: Number }], //array of all ratings, ever
    avgRating: { type: Number }
})

module.exports = mongoose.model('Tag', TagSchema)