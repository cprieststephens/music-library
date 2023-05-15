const express = require("express");
const {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
} = require("../controllers/artist");

const artistRouter = express.Router();

artistRouter.route("/").post(createArtist).get(getAllArtists);

artistRouter.route("/:id").get(getArtistById).put(updateArtist);

module.exports = { artistRouter };
