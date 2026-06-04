const { Router } = require('express');
const { create, list, deposit } = require('./envelope.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

const router = Router();

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, list);
router.post('/:id/deposit', authMiddleware, deposit);

module.exports = router;
