// Инициализация Sequelize, определение моделей и начальное наполнение БД

const bcrypt =  require('bcryptjs');
const { createSequelize } = require('../config/database');

const defineUser = require('./User');
const defineFilm = require('./Film');

let sequelize;
let User;
let Film;

async function initDb() {
    // Создаем инстанс Sequelize и модели
    sequelize = await createSequelize();

    User = defineUser(sequelize);
    Film = defineFilm(sequelize);

    // Синхронизируем модели (создаем таблицы при отсуствии)
    await sequelize.sync();

    //Начальные данные: два пользователя при отсутствии
    const usersCount = await User.count();
    if (usersCount === 0) {
        // Шифруем пароли
        const adminPass = await bcrypt.hash('123', 10);
        const userPass = await bcrypt.hash('321', 10);

        await User.bulkCreate([
            { name: 'Administrator', email: 'admin@myshop.local', password: adminPass, rule: 'admin' },
            { name: 'Customer', email: 'user@myshop.local', password: userPass, rule: 'user' }
        ]);
    }

    // Начальные товары: добавим 6, если их меньше 6
    const filmsCount = await Film.count();
    if (filmsCount < 6) {
        const needed = 6 - filmsCount;
        const baseDesc = 'Sample film description for demo purposes.';
        const pic = 'https://www.hi-fi.ru/upload/iblock/8e4/8e44111e0794046848239ece96cecaad.jpg';
        const existing = await Film.findAll({ attributes: ['name'] });
        const existingNames = new Set(existing.map((p) => p.name));

        const items = [];
        for (let i = 1; i <= 6; i++) {
            const name = `Demo Film ${i}`;
            if (!existingNames.has(name)) {
                items.push({ name, desc: baseDesc, price: (i * 10).toFixed(2), createdAt: new Date(), pic });
            }
        }
        if (items.length) {
            await Film.bulkCreate(items);
        }
    }

    return sequelize;
}

function getModels() {
    if (!sequelize) throw new Error('DB not initialized yet');
    return { sequelize, User, Film };
}

module.exports = { initDb, getModels };

// +