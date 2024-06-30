const pool = require('../DB');
async function getPhotos() {
    try {
      const sql = 'SELECT * FROM photos';
      const [rows] = await pool.query(sql);
      console.log(rows); 
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function getPhoto(id) {
    try {
      const sql = 'SELECT * FROM photos where id=?'; 
      const result = await pool.query(sql, [id]);
      return result[0][0];
    } catch (err) {
      console.log(err);
    }
  }
    
  async function createPhoto(albumId, title,url,thumbnailUrl) {
    try {
      const sql = `INSERT INTO photos ('albumId', 'title','url','thumbnailUrl') values(${albumId}, ${title}, ${url}, ${thumbnailUrl})`; 
      const result = await pool.query(sql);
      return result[0][0];
    } catch (err) {
      throw err;
    }
  }
  async function deletePhoto(photoId) {
    try {
      const sql = `DELETE FROM photos WHERE id = ?`;
      const result = await pool.query(sql, [photoId]);
       return result[0][0];
    } catch (err) {
      console.error('Error deleting photo:', err);
      throw err;
    }
  }
  async function updatePhoto(albumId,id, title,url,thumbnailUrl) {
    try {
      const sql = `UPDATE photos SET albumId = ?, title = ?, url = ?,thumbnailUrl=? WHERE id = ?`;
      const result = await pool.query(sql, [albumId, title,url,thumbnailUrl,id]);
      return result[0][0];
    } catch (err) {
      console.error('Error updating photo:', err);
      throw err;
    }
  }
module.exports = {createPhoto, updatePhoto, getPhoto, getPhotos, deletePhoto}  