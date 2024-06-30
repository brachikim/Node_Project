const model = require('../model/usersModel');
const bcrypt = require('bcrypt')
const saltRounds = 10;

async function getUsers() {
    try {
        return model.getUsers();
    } catch (err) {
        throw err;
    }
}

async function getUserById(id) {
    try {
        return model.getUserById(id);
    } catch (err) {
        throw err;
    }

}

async function getUserByUsername(username) {
    try {
        return model.getUserByUsername(username);
    } catch (err) {
        throw err;
    }

}

async function createUser( name, username, email, phone,password, city, street,buildingNum) {
    try {
        const validate = await model.validateUsername(username)
     if (validate){
        return null
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return await model.createUser(name, username, email, phone,hashedPassword, city, street,buildingNum);
    }
    } catch (err) {
        throw err;
    }
}

async function deleteUser(id) {
    try {
        return model.deleteUser(id);
    } catch (err) {
        throw err;
    }
}

async function updateUser(name, username, email, street, city, phone) {
    try {
        return model.updateUser(name, username, email, street, city, phone);
    } catch (err) {
        throw err;
    }
}

async function verification(id, password) {
    try {
        const result = await model.verification(id, password);
       return result;
    } catch (err) {
        throw err;
    }
}



module.exports = { getUsers, getUserById, getUserByUsername, createUser, deleteUser, updateUser, verification }
