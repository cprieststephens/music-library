const express = require("express");
const { getAllAlbums, getAlbumById, updateAlbum } = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.route("/").get(getAllAlbums);

albumRouter.route("/:id").get(getAlbumById).put(updateAlbum);

module.exports = { albumRouter };