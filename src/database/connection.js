const Sequelize = require('sequelize');

require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const DB_CONFIG = {
  host: DB_HOST,
  dialect: 'mysql',
  timezone: '-03:00'
}

const connection = new Sequelize(
  DB_NAME,
  DB_USER_NAME,
  DB_PASSWORD,
  DB_CONFIG,
);

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully!');
  })
  .catch(error => {
    console.log('Unable to connect to the database', error);
  });

module.exports = connection;