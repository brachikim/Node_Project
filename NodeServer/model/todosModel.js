const pool = require('../DB.js');

async function getTodos(userId) {
  try {
    const sql = 'SELECT * FROM todos WHERE userId = ?';
    const [result] = await pool.query(sql, [userId]);
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function getTodo(id) {
  try {
    const sql = 'SELECT * FROM todos where id=?';
    const [result] = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function createTodo(userId, title, completed) {
  try {
    const sql = `INSERT INTO todos (userId, title, completed) values('${userId}', '${title}', ${completed})`;
    const [result] = await pool.query(sql);
    return result.insertId;
  } catch (err) {
    console.error('Error creating todo:', err)
    throw err;
  }
}

async function deleteTodo(todoId) {
  try {
    const sql = `DELETE FROM todos WHERE id = ?`;
    await pool.query(sql, [todoId]);
  } catch (err) {
    console.error('Error deleting todo:', err);
    throw err;
  }
}

async function updateTodo(id, title, completed) {
  try {
    const sql = `UPDATE todos SET title = ?, completed = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [title, completed, id]);
    return result;
  } catch (err) {
    console.error('Error updating todo:', err);
    throw err;
  }
}
module.exports = { createTodo, updateTodo, getTodo, getTodos, deleteTodo }  