const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Book = db.define('Book', {
    // ID otomatis dibuat oleh Sequelize, jadi tidak perlu ditulis manual
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    freezeTableName: true // Agar nama tabel tetap 'Book', bukan 'Books'
});

module.exports = Book;