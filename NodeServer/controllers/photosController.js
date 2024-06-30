const model = require('../model/photosModel');

async function getPhotos() {
    try {
        return model.getPhotos();
    } catch (err) {
        throw err;
    }
}

async function getPhoto(id) {
    try {
        return model.getPhoto(id);
    } catch (err) {
        throw err;
    }

}

async function createPhoto(albumId, title,url,thumbnailUrl) {
    try {
        return model.createPhoto(albumId, title,url,thumbnailUrl); 
    } catch (err) {
        throw err;
    }
}

async function deletePhoto(id) {
    try {
        return model.deletePhoto(id);
    } catch (err) {
        throw err;
    }
}

async function updatePhoto(albumId, title,url,thumbnailUrl,id) {
    try {
        return model.updatePhoto(albumId, title,url,thumbnailUrl,id);
    } catch (err) {
        throw err;
    }
}



module.exports = { getPhotos , getPhoto, createPhoto, deletePhoto,updatePhoto}
