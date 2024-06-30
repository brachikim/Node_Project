const express = require("express");
const router = express.Router();
const controller = require('../controllers/albumsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
.get(async(req, res) => {
    const users = await controller.getAlbums();
    res.status(200).send(users)
})
.post(async (req, res) => { 
    const { userId, title } = req.body; 
    const album = await controller.createAlbum(userId, title); 
    res.status(201).send(album);
});

router.route("/:id")
.get(async(req, res) => {
    const id = req.params.id;
    const album = await controller.getAlbum(id);
    res.status(200).send(album)
})
.delete(async(req, res) => {
    const id = req.params.id;
    const album = await controller.deleteAlbum(id);
    res.status(200).send(album)
})
.put(async(req, res) => {
    const id = req.params.id;
    const response=await controller.updateAlbum(req.body.title,id)
    res.status(200).send(response);
});
module.exports = router