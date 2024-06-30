const model = require('../model/postsModel');

async function getPosts(userId) {
    try {
        return model.getPosts(userId);
    } catch (err) {
        throw err;
    }
}

async function getPost(id) {
    try {
        return model.getPost(id);
    } catch (err) {
        throw err;
    }

}

async function createPost(userId, title,body) {
    try {
        return model.createPost(userId, title,body); 
    } catch (err) {
        throw err;
    }
}

async function deletePost(id) {
    try {
        return model.deletePost(id);
    } catch (err) {
        throw err;
    }
}

async function updatePost(postId,title,body) {
    try {
        return model.updatePost(postId,title,body);
    } catch (err) {
        throw err;
    }
}



module.exports = { getPosts , getPost, createPost, deletePost,updatePost}
