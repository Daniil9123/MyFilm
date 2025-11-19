const express = require('express');
const router = express.Router();

const { requireAuth, requireAdmin } = require('../middleware/auth');
const auth = require('../controllers/authController');
const film = require('../controllers/filmController');

// Главная страница
router.get('/', film.listPage);

// Логин/Логаут
router.get('/login', auth.getLogin);
router.post('/login', auth.postLogin);
router.post('/logout', auth.postLogout);

// CRUD товаров (веб)
router.get('/films/new', requireAdmin, film.newForm);
router.post('/films', requireAdmin, film.create);
router.get('/films/:id/edit', requireAdmin, film.editForm);
router.post('/films/:id', requireAdmin, film.update);
router.post('/films/:id/delete', requireAdmin, film.remove);
module.exports = router;

