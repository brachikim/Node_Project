const pool = require('../DB');

async function getAlbums() {
    try {
      const sql = 'SELECT * FROM albums';
      const [rows] = await pool.query(sql);
      console.log(rows);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function getAlbum(id) {
    try {
      const sql = 'SELECT * FROM albums where id=?';
      const result = await pool.query(sql, [id]);
      return result[0][0];
    } catch (err) {
      console.log(err);
    }
  }
  
  async function createAlbum(userId, title) {
    try {
      const sql = `INSERT INTO albums ('userId', 'title') values( ${userId}, ${title})`;     ;
      const result = await pool.query(sql);
      return result[0][0];
    } catch (err) {
      throw err;
    }
  }
  async function deleteAlbum(albumId) {
    try {
      const sql = `DELETE FROM albums WHERE id = ?`;
      const result = await pool.query(sql, [albumId]);
       return result[0][0];
    } catch (err) {
      console.error('Error deleting album:', err);
      throw err;
    }
  }
  
  async function updateAlbum(id, title) {
    try {
      const sql = `UPDATE albums SET  title = ? WHERE id = ?`;
      const result = await pool.query(sql, [title, id]);
      return result[0][0];
    } catch (err) {
      console.error('Error updating album:', err);
      throw err;
    }
  }
module.exports = {createAlbum, updateAlbum, getAlbum, getAlbums, deleteAlbum}  