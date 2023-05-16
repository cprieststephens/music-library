const express = require("express");
const { getAllAlbums, getAlbumById } = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.route("/").get(getAllAlbums);

albumRouter.route("/:id").get(getAlbumById);

module.exports = { albumRouter };