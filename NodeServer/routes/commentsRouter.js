const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
    .get(async (req, res) => {
        const comments = await controller.getComments(req.query.postId);
        res.status(200).send(comments)
    })
    .post(async (req, res) => {
        const { postId, name, email, body } = req.body;
        const commentId = await controller.createComment(postId, name, email, body);
        res.status(201).send(await controller.getComment(commentId));
    });

router.route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const comment = await controller.getComment(id);
        res.status(200).send(comment)
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        const comment = await controller.deleteComment(id);
        res.status(200).send(comment)
    })
    .put(async (req, res) => {
        const { postId, name, email, body } = req.body;
        const id = req.params.id;
        const response = await controller.updateComment(postId, name, email, body, id)
        res.status(200).send(response);
    });
module.exports = router