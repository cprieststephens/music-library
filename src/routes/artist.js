const express = require("express");
const { createArtist } = require("../controllers/artist");

const router = express.Router();

router.route("/").post(createArtist);

module.exports = router;
