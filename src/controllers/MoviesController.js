const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const MoviesModel = require("../models/Movies");

require("dotenv").config();

const GHIBLI_API = process.env.GHIBLI_API;

module.exports = {
  async index(request, response) {
    try {
      const total = await MoviesModel.count();

      if (!total) {
        return response
          .status(200)
          .json({ message: "There are no movies in the database" });
      }

      const { limit = total, page = 1 } = request.query;

      const offset = (Number(page) - 1) * limit;

      const pages = Math.ceil(total / limit);

      if (page > pages) {
        return response
          .status(400)
          .json({ message: `Max page is ${pages}, ${page} were sent` });
      }

      const movies = await MoviesModel.findAll({
        limit: Number(limit),
        offset: Number(offset),
        order: ["release_date"],
      });

      return response
        .status(200)
        .json({
          total,
          perPage: Number(limit),
          pages,
          currentPage: Number(page),
          movies,
        });
    } catch (error) {
      return response
        .status(400)
        .json({ erro: `Error fetching movies: ${error}` });
    }
  },

  async populate(request, response) {
    try {
      for (let i = 0; i < 8; i++) {
        const res = await axios.get(`${GHIBLI_API}/films`);

        if (res.data) {
          res.data.map(async (movie) => {
            const {
              title,
              original_title,
              description,
              release_date,
              rt_score,
            } = movie;

            const payload = {
              id: uuidv4(),
              title,
              original_title,
              description,
              release_date,
              rt_score,
            };

            await MoviesModel.create(payload);
          });
        }
      }
      return response.status(200).json({ message: "Populate successfully" });
    } catch (error) {
      return response
        .status(400)
        .json({ erro: `Error populate movies: ${error}` });
    }
  },
};
