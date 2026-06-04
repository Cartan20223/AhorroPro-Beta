const { Router } = require('express');
const { register, login, logout } = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

module.exports = router;
