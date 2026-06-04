const { Router } = require('express');
const { getProfile, depositBalance } = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/deposit', authMiddleware, depositBalance);

module.exports = router;
