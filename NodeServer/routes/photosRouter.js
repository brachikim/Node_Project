const express = require("express");
const router = express.Router();
const controller = require('../controllers/photosController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
.get(async(req, res) => {
    const photos = await controller.getPhotos();
    res.status(200).send(photos)
})
.post(async (req, res) => { 
    const { userId, title } = req.body; 
    const photo = await controller.createPhoto(userId, title); 
    res.status(201).send(photo);
});

router.route("/:id")
.get(async(req, res) => {
    const id = req.params.id;
    const photo = await controller.getPhoto(id);
    res.status(200).send(photo)
})
.delete(async(req, res) => {
    const id = req.params.id;
    const photo = await controller.deletePhoto(id);
    res.status(200).send(photo)
})
.put(async(req, res) => {
    const id = req.params.id;
    const response=await controller.updatePhoto(req.body.title,id)
    res.status(200).send(response);
});
module.exports = router