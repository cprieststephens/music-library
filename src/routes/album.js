const express = require("express");
const { getAllAlbums } = require("../controllers/album");

const albumRouter = express.Router();

albumRouter.route("/").get(getAllAlbums);

module.exports = { albumRouter };