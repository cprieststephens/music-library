const express = require('express');

const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} = require('../controllers/artist');

const { createAlbum } = require('../controllers/album');

const artistRouter = express.Router();

artistRouter.route('/').post(createArtist).get(getAllArtists);

artistRouter
  .route('/:id')
  .get(getArtistById)
  .patch(updateArtist)
  .delete(deleteArtist);

artistRouter.route('/:artistId/albums').post(createAlbum);

module.exports = { artistRouter };
