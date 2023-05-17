const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Update Album", () => {
  let artist;
  let album;
  beforeEach(async () => {
    const artistRow = await db.query(
      "INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *",
      ["Tame Impala", "rock"]
    );
    
     artist = artistRow.rows[0];
  
    const  albumRow  = await db.query(
      "INSERT INTO Albums (name, year, artistId) VALUES($1, $2, $3) RETURNING *",
      ["Innerspeaker", "2010", artist.id]
    );

    album = albumRow.rows[0];
  });

  describe("PUT /albums/{id}", () => {
    it("replaces the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .put(`/albums/${album.id}`)
        .send({ name: "test", year: 2023, artistId: artist.id });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "test",
        year: 2023,
        artistid: artist.id,
      });
    });
  });
});
