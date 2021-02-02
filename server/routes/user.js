const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/auth', auth, userController.auth);
router.get('/logout', auth, userController.logout);


module.exports = router;
