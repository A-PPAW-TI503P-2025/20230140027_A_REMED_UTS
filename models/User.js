const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, // Harusnya di-hash, tapi kita plain dulu agar mudah
    role: { 
        type: DataTypes.ENUM('admin', 'user'), 
        defaultValue: 'user' 
    }
}, { freezeTableName: true });

module.exports = User;