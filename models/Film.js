// Модель товара
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Film = sequelize.define(
        'Film',
        {
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING(255), allowNull: false },
            desc: { type: DataTypes.TEXT, allowNull: false },
            price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            pic: { type: DataTypes.STRING(255), allowNull: false }
        },
        {
            tableName: 'films',
            timestamps: true
        }
    );
    return Film
};

