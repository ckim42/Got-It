const Comment = require('../models/comment')

module.exports = (app) => {

  // Create comment
  app.post('/entries/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      console.log(comment)
      res.redirect(`/entries/${comment.entryId}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // Delete
  app.delete('/entries/comments/:id', (req, res) => {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/entries/${comment.entryId}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })

}
