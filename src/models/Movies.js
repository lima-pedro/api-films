const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Movies = connection.define('movies', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  original_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  release_date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rt_score: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

Movies.sync({ force: false }).then( ()=> {} );

module.exports = Movies;