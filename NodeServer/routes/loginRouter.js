const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password)
        if (!username || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await usersController.getUserByUsername(username);
        const isVerified = await usersController.verification(user.id, password);
        if (isVerified) {
            res.status(200).send(user)
        }
        else {
            return res.status(403).json({ error: "Incorrect password or username" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router