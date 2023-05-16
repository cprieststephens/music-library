const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Read Albums", () => {
  let artists;
  let albums;
  beforeEach(async () => {
    const artistData = await Promise.all([
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *", 
        ["Lana Del Ray", "pop"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *", 
        ["Patrick Wolf", "indie"]
      ),
      db.query(
        "INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *", 
        ["Lemon Jelly", "electronic"]
      ),
    ]);
    artists = artistData.map(({ rows }) => rows[0]);

    const albumData = await Promise.all([
      db.query("INSERT INTO Albums (name, year, artistId) VALUES($1, $2, $3) RETURNING *", [
        "Chemtrails Over the Country Club",
        "2021",
        artists[0].id,
      ]),
      db.query("INSERT INTO Albums (name, year, artistId) VALUES($1, $2, $3) RETURNING *", [
        "The Magic Position",
        "2007",
        artists[1].id,
      ]),
      db.query("INSERT INTO Albums (name, year, artistId) VALUES($1, $2, $3) RETURNING *", [
        "Lost Horizons",
        "2002",
        artists[2].id,
      ]),
    ]);
    albums = albumData.map(({ rows }) => rows[0]);
  });

  describe("GET /albums", () => {
    it("returns all album records in the database", async () => {
      const { status, body } = await request(app).get("/albums").send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((albumRecord) => {
        const expected = albums.find((a) => a.id === albumRecord.id);

        expect(albumRecord).to.deep.equal(expected);
      });
    });
  });

});