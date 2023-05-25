const express = require("express");
const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  createAlbum
} = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.route("/").post(createArtist).get(getAllArtists);

artistRouter.route("/:id").get(getArtistById).patch(updateArtist).delete(deleteArtist);

artistRouter.route("/:artistId/albums").post(createAlbum);

module.exports = { artistRouter };
