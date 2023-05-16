const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db/index");
const app = require("../src/app");

describe("create album", () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query("INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *", [
      "Tame Impala",
      "rock"
    ]);

    artist = rows[0];
  });

  describe("POST /artists/{id}/albums", () => {
      it("creates a new album in the database", async () => {
        const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({
          name: "Innerspeaker",
          year: 2010,
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal("Innerspeaker");
        expect(body.year).to.equal(2010);

        const {
          rows: [albumData],
        } = await db.query(`SELECT * FROM Albums WHERE artistId = ${artist.id}`);
        expect(albumData.name).to.equal("Innerspeaker");
        expect(albumData.year).to.equal(2010);
        expect(albumData.artistid).to.equal(artist.id);
      });
    });
  });
