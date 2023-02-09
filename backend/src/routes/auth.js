const express = require('express');
const router = express.Router();

const authController = require('../app/controller/AuthController');
const {
    verifyRefreshToken,
    verifyToken,
} = require('../app/middleware/verifyToken');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', verifyRefreshToken, authController.requestRefreshToken);
router.post('/logout', verifyToken, authController.logout);
router.get('/token', authController.getToken)

module.exports = router;