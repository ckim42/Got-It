const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    ratingNum: { type: Number, required: true },
    tagsUsed: [{ type: Array, required: true }], //array of strings
    entryId: { type: Schema.Types.ObjectId, ref: 'Entry'}
})

module.exports = mongoose.model('Rating', RatingSchema)