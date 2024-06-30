const pool = require('../DB');
async function getPosts(userId) {
    try {
      const sql = 'SELECT * FROM posts WHERE userId = ?'; 
      const [result] = await pool.query(sql, [userId]);  
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function getPost(id) {
    try {
      const sql = 'SELECT * FROM posts where id=?';
      const [result] = await pool.query(sql, [id]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }
   
  async function createPost(userId, title,body) {
    try {
      const sql = `INSERT INTO posts (userId, title, body) values('${userId}', '${title}', '${body}')`;
      const [result] = await pool.query(sql); 
      return result.insertId; 
    } catch (err) {
      throw err;
    }
  }
  
  async function deletePost(postId) {
    try {
      const sql1 = `DELETE FROM comments WHERE postId = ?`;
      await pool.query(sql1, [postId]);
      const sql2 = `DELETE FROM posts WHERE id = ?`;
      await pool.query(sql2, [postId]);
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  }

  async function updatePost(postId,title,body) {
    try {
      const sql = `UPDATE posts SET title = ?, body = ? WHERE id = ?`;
      const [result] = await pool.query(sql, [title,body,postId]);
      return result;
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  }
module.exports = {createPost, updatePost, getPost, getPosts, deletePost}  