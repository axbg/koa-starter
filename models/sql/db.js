const Sequelize = require('sequelize');

const {DB_URI} = require('../../properties');

const sequelize = new Sequelize(DB_URI);

// sequelize config

module.exports = sequelize;
