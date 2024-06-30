const express = require("express");
const router = express.Router();
const controller = require('../controllers/postsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
.get(async(req, res) => {
    const posts = await controller.getPosts(req.query.userId);
    res.status(200).send(posts)
})
.post(async (req, res) => { 
    const { userId, title,body } = req.body; 
    const postId = await controller.createPost(userId, title,body); 
    res.status(201).send(await controller.getPost(postId));
});

router.route("/:id")
.get(async(req, res) => {
    const id = req.params.id;
    const post = await controller.getPost(id);
    res.status(200).send(post)
})
.delete(async(req, res) => {
    const id = req.params.id;
    const post = await controller.deletePost(id);
    res.status(200).send(post)
})
.put(async(req, res) => {
    const response=await controller.updatePost(req.params.id, req.body.title, req.body.body)
    res.status(200).send(response);
});
module.exports = router