const pool = require('../DB');

async function getComments(postId) {
    try {
        const sql = 'SELECT * FROM comments WHERE postId = ?';
        const [result] = await pool.query(sql, [postId]);
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getComment(id) {
    try {
        const sql = 'SELECT * FROM comments where id=?';
        const [result] = await pool.query(sql, [id]);
        return result[0];
    } catch (err) {
        console.log(err);
    }
}

async function createComment(postId, name, email, body) {
    try {
        const sql = `INSERT INTO comments (postId, name, email, body) values('${postId}', '${name}', '${email}', '${body}')`;
        const [result] = await pool.query(sql);
        return result.insertId;
    } catch (err) {
        throw err;
    }
}

async function deleteComment(commentId) {
    try {
        const sql = `DELETE FROM comments WHERE id = ?`;
        await pool.query(sql, [commentId]);
    } catch (err) {
        console.error('Error deleting comment:', err);
        throw err;
    }
}
async function updateComment(postId, name, email, body, id) {
    try {
        const sql = `UPDATE comments SET postId = ?, name = ?, email = ?,body=? WHERE id = ?`;
        const [result] = await pool.query(sql, [postId, name, email, body, id]);
        return result;
    } catch (err) {
        console.error('Error updating comment:', err);
        throw err;
    }
}
module.exports = { createComment, updateComment, getComment, getComments, deleteComment }  