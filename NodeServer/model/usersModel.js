const pool = require('../DB.js');
const bcrypt = require('bcrypt');

async function getUsers() {
    try {
        const sql = `SELECT users.id AS userId, users.name, users.username, users.email, users.phone, addresses.city, addresses.street, addresses.numBuilding
        FROM addresses
        JOIN users ON users.id = addresses.userId`;
        const [rows] = await pool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.error('Error getting users:', err);
        throw err;
    }
}


async function getUserById(id) {
    try {
        const sql = `SELECT id, name, username, email, phone, city, street, numBuilding
        FROM addresses
        JOIN users ON users.id = addresses.userId
        where id=?`;
        const result = await pool.query(sql, [id]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}

async function getUserByUsername(username) {
    try {
        const sql = `SELECT users.id, users.name, users.username, users.email, users.phone, addresses.city, addresses.street, addresses.numBuilding
        FROM addresses
        JOIN users ON users.id = addresses.userId
        WHERE users.username=?`;
        const result = await pool.query(sql, [username]);
        return result[0][0];
    } catch (err) {
        console.log(err);
    }
}


async function createUser( name, username, email, phone,password, city, street,buildingNum) {

    try {
        const [result] = await pool.query(
            "INSERT INTO users(name,username, email, phone) VALUES(?,?, ?, ?)", [name,username, email, phone]
        )
        console.log('result.insertId: ' + result.insertId)
        await pool.query(
            "INSERT INTO addresses(userId, city, street, numBuilding) VALUES(?, ?, ?, ?)", [result.insertId, city, street, buildingNum]
        )
        await pool.query(
            "INSERT INTO passwords(userId, password) VALUES(?, ?)", [result.insertId, password]
        )
        return result.insertId
    } catch (err) {
        console.error('Error creating user:', err)
        throw err
    }
}



async function deleteUser(userId) {
    try {
        const sql = `DELETE FROM users WHERE id = ?`;
        const result = await pool.query(sql, [userId]);
        return result[0][0];
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
}
async function updateUser(id, name, username, email, street, city, phone) {
    try {
        const sql = `UPDATE users SET name = ?,username = ?, email = ?, street = ?, city = ?, phone = ? WHERE id = ?`;
        const result = await pool.query(sql, [name, username, email, street, city, phone, id]);
        return result[0][0];
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
}

async function verification(id, password) {
    // try {
    //     const sql = 'SELECT * FROM passwords WHERE userId = ? AND password = ?';
    //     const result = await pool.query(sql, [username, password]);
    //     return result[0];
    // } catch (err) {
    //     throw err;
    // }
    console.log(id,password)
    try {
        const [userPassword] = await pool.query(`SELECT password FROM passwords where userId=?`, [id])
        const hashedPassword = userPassword[0].password;
        console.log(id,hashedPassword)
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch)
        return isMatch;
    } catch (err) {
        console.error('Error confirm password:', err)
        throw err
    }
}

async function validateUsername(username) {
    try {
        const [existUser] = await pool.query(`SELECT username FROM users where username=?`, [username])
        return existUser[0]
    } catch (err) {
        console.error('Error validate user:', err)
        throw err
    }
}
module.exports = { createUser, updateUser, getUserById,getUserByUsername, getUsers, deleteUser,verification,validateUsername }  