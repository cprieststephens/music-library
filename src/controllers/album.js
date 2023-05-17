const db = require("../db/index");

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Albums");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query("SELECT * FROM Albums WHERE id = $1", [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist`});
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateAlbum = async (req,res) => {
  const { id } = req.params;
  const { name, year, artistId } = req.body;

  try {
    const {
      rows: [album],
    } = await db.query("UPDATE Albums SET name = $1, year = $2, artistId = $3 WHERE id = $4 RETURNING *", [name, year, artistId, id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = { getAllAlbums, getAlbumById, updateAlbum };