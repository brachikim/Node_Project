const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    const user = await controller.getUserByUsername(req.query.username)
    if (user) {
        res.status(409).send(user);
    } else {
        res.status(201).send(user);
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getUserById(id);
    res.status(200).send(user)
})

router.post("/", async (req, res) => {
    const user = req.body;
    const response = await controller.createUser(user.name, user.username, user.email, user.phone, user.password, user.street, user.city, user.buildingNum);
    console.log(response);
    if (response) {
        res.status(201);
    }
    else {
        res.status(501).send(response);
    }
});

module.exports = router