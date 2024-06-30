const model = require('../model/todosModel');

async function getTodos(userId) {
    try {
        return await model.getTodos(userId);
    } catch (err) {
        throw err;
    }
}

async function getTodo(id) {
    try {
        return await model.getTodo(id);
    } catch (err) {
        throw err;
    }

}

async function createTodo(userId, title, completed) {
    try {
        return await model.createTodo(userId, title, completed);
    } catch (err) {
        throw err;
    }
}

async function deleteTodo(id) {
    try {
        return await model.deleteTodo(id);
    } catch (err) {
        throw err;
    }
}

async function updateTodo(id, title, completed) {
    try {
        return await model.updateTodo(id, title, completed);
    } catch (err) {
        throw err;
    }
}



module.exports = { getTodos, getTodo, createTodo, deleteTodo, updateTodo }
