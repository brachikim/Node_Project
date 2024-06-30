const model = require('../model/albumsModel');

async function getAlbums() {
    try {
        return model.getAlbums();
    } catch (err) {
        throw err;
    }
}

async function getAlbum(id) {
    try {
        return model.getAlbum(id);
    } catch (err) {
        throw err;
    }

}

async function createAlbum(userId, title) {
    try {
        return model.createAlbum(userId, title); 
    } catch (err) {
        throw err;
    }
}

async function deleteAlbum(id) {
    try {
        return model.deleteAlbum(id);
    } catch (err) {
        throw err;
    }
}

async function updateAlbum(title,id) {
    try {
        return model.updateAlbum(title,id);
    } catch (err) {
        throw err;
    }
}



module.exports = { getAlbums , getAlbum, createAlbum, deleteAlbum,updateAlbum}
