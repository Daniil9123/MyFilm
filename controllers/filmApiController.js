// Контроллер REST API для товаров

const { getModels } = require('../models');

// GET /api/films
async function list(req, res) {
    const { Film } = getModels();
    const films = await Film.findAll({ order: [['id', 'ASC']] });
    res.json(films);
}

// GET /api/films/:id
async function getOne(req, res) {
    const { Film } = getModels();
    const item = await Film.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
}

// POST /api/films
async function create(req, res) {
    const { Film } = getModels();
    const { name, desc, price, createdAt } = req.body;
    let { pic } = req.body;
    if (!pic ||  !pic.trim()) pic = 'https://www.hi-fi.ru/upload/iblock/8e4/8e44111e0794046848239ece96cecaad.jpg';
    const created = await Film.create({ name, desc, price, createdAt, pic });
    res.status(201).json(created);
}

// PUT /api/films/:id
async function update(req, res) {
    const { Film } = getModels();
    const item = await Film.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    const { name, desc, price, createdAt } = req.body;
    let { pic } = req.body;
    if (!pic || !pic.trim()) pic = 'https://www.hi-fi.ru/upload/iblock/8e4/8e44111e0794046848239ece96cecaad.jpg';
    await item.update({ name, desc, price, createdAt, pic });
    res.json(item);
}

// DELETE /api/films/:id
async function remove(req, res) {
    const { Film } = getModels();
    const item = await Film.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.destroy();
    res.status(204).send();
}

module.exports = { list, getOne, create, update, remove };
// +