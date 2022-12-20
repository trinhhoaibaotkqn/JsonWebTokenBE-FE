const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController');
//Middleware verify token
const {
    verifyToken,
    verifyTokenAndAdminAuth
} = require('../app/middleware/verifyToken');

router.get('/list-users', verifyToken, userController.getAllUsers);
router.delete('/delete/:id', verifyTokenAndAdminAuth, userController.deleteUser)

module.exports = router;