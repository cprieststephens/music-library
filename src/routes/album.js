const express = require("express");
const { getAllAlbums, getAlbumById, updateAlbum, deleteAlbum } = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.route("/").get(getAllAlbums);

albumRouter.route("/:id").get(getAlbumById).patch(updateAlbum).delete(deleteAlbum);

module.exports = { albumRouter };