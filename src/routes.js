const express = require('express');
const MoviesController = require('./controllers/MoviesController');

const routes = express.Router();

routes.get('/movies/populate', MoviesController.populate);
routes.get('/movies', MoviesController.index);

module.exports = routes;