// Контроллер для веб-части работы с товарами (страницы)

const { getModels } = require('../models');

// Главная страница - список товаров
async function listPage(req, res) {
    const { Film } = getModels();
    const films = await Film.findAll({ order: [['id', 'ASC']] });
    res.render('index', { title: 'MyFim', films });
}

// Форма создания товара (только админ)
async function newForm(req, res) {
    res.render('film_form', { title: 'New Film', film: null });
}

// Создание товара
async function create(req, res) {
    const { Film } = getModels();
    // Принимаем адрес картинки из формы; по умолчанию используем тестовую
    const { name, desc, price, createdAt } = req.body;
    let { pic } = req.body;
    if (!pic || !pic.trim()) pic = 'https://www.hi-fi.ru/upload/iblock/8e4/8e44111e0794046848239ece96cecaad.jpg';
    await Film.create({ name, desc, price, createdAt, pic });
    res.redirect('/');
}

// Форма редактирования
async function editForm(req, res) {
    const { Film } = getModels();
    const film = await Film.findByPk(req.params.id);
    if (!film) return res.status(404).send('Not found');
    res.render('film_form', { title: 'Edit Film', film });
}

// Обновление товара
async function update(req, res) {
    const { Film } = getModels();
    const { name, desc, price, createdAt } = req.body;
    let { pic } = req.body;
    if (!pic || !pic.trim()) pic = 'https://www.hi-fi.ru/upload/iblock/8e4/8e44111e0794046848239ece96cecaad.jpg';
    const film = await Film.findByPk(req.params.id);
    if (!film) return res.status(404).send('Not found');
    await film.update({ name, desc, price, createdAt, pic });
    res.redirect('/');
}

// Удаление товара
async function remove(req, res) {
    const { Film } = getModels();
    const film = await Film.findByPk(req.params.id);
    if (!film) return res.status(404).send('Not found');
    await film.destroy();
    res.redirect('/');
}

module.exports = { listPage, newForm, create, editForm, update, remove };
