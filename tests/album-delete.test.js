const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let artist;
  let album;
  beforeEach(async () => {
    const artistRow = await db.query(
      'INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *',
      ['Tame Impala', 'rock']
    );

    artist = artistRow.rows[0];

    const albumRow = await db.query(
      'INSERT INTO Albums (name, year, artistId) VALUES($1, $2, $3) RETURNING *',
      ['Innerspeaker', '2010', artist.id]
    );

    album = albumRow.rows[0];
  });

  describe('DELETE /albums{id}', () => {
    it('deletes the album and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'Innerspeaker',
        year: 2010,
        artistid: artist.id,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
