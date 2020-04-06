const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Meme
      .create({ ...req.body, user: req.user._id })
      .then(meme => res.send(meme))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Meme
      .findById(req.params.id)
      .populate('user')
      .then(meme => res.send(meme))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Meme  
      .find()
      .then(memes => res.send(memes))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Meme
      .findOneAndUpdate({
        _id: req.params.id,
        user: req.user._id
      }, req.body, { new: true })
      .then(meme => res.send(meme))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Meme
      .findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      })
      .then(meme => res.send(meme))
      .catch(next);
  });