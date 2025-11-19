const express = require('express');
const router = express.Router();

const { requireAdmin } = require('../middleware/auth');
const api = require('../controllers/filmApiController');

// Чтение доступно всем, изменение - только админу
router.get('/films', api.list);
router.get('/films/:id', api.getOne);
router.post('/films', requireAdmin, api.create);
router.put('/films/:id', requireAdmin, api.update);
router.delete('/films/:id', requireAdmin, api.remove);
module.exports = router;

