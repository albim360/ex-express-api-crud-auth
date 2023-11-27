const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/signup', async (req, res) => {
    await UserController.signup(req, res);
});

router.post('/login', async (req, res) => {
    await UserController.signin(req, res);
});

module.exports = router;
