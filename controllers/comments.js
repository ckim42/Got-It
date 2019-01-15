const Comment = require('../models/comment');
const express = require('express');
const app = express();

module.exports = (app) => {

  // CREATE Comment
  app.post('/entries/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      console.log(comment)
      res.redirect(`/entries/${comment.entryId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  //DELETE
  app.delete('/entries/comments/:id', function (req, res) {
    console.log("DELETE comment")
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/entries/${comment.entryId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

}
