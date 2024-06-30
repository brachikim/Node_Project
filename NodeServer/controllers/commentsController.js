const model = require('../model/commentsModel');

async function getComments(postId) {
    try {
        return model.getComments(postId);
    } catch (err) {
        throw err;
    }
}

async function getComment(id) {
    try {
        return model.getComment(id);
    } catch (err) {
        throw err;
    }

}

async function createComment(postId, name,email,body) {
    try {
        return model.createComment(postId, name,email,body); 
    } catch (err) {
        throw err;
    }
}

async function deleteComment(id) {
    try {
        return model.deleteComment(id);
    } catch (err) {
        throw err;
    }
}

async function updateComment(postId, name,email,body,id) {
    try {
        return model.updateComment(postId, name,email,body,id);
    } catch (err) {
        throw err;
    }
}



module.exports = { getComments , getComment, createComment, deleteComment,updateComment}
