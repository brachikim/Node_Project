const express = require("express");
const router = express.Router();
const controller = require('../controllers/todosController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/")
    .get(async (req, res) => {
        const todos = await controller.getTodos(req.query.userId);
        res.status(200).send(todos)
    })
    .post(async (req, res) => {
        const { userId, title, completed } = req.body;
        const todoId = await controller.createTodo(userId, title, completed);
        res.status(201).send(await controller.getTodo(todoId));
    });
router.route("/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        const todo = await controller.getTodo(id);
        res.status(200).send(todo)
    })
    .delete(async (req, res) => {
        const todo = await controller.deleteTodo(req.params.id);
        res.status(200).send(todo)
    })
    .put(async (req, res) => {
        const response = await controller.updateTodo(req.params.id, req.body.title, req.body.completed)
        res.status(200).send(response);
    });
module.exports = router