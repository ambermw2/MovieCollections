'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import userStore from "../models/user-store.js";
import accounts from "./accounts.js";

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");
    
    const categories = appStore.getAllCategories();

    const numCategories = categories.length;

    const movies = categories.flatMap(category =>
      category.items ? category.items : []
    );

    const numMovies = movies.length;

    const ratedMovies = movies.filter(movie => typeof movie !== "string" && movie.rating);

    const totalRating = ratedMovies.reduce(
      (total, movie) => total + parseInt(movie.rating),
      0
    );

    const avgRating =
      ratedMovies.length > 0 ? (totalRating / ratedMovies.length).toFixed(2) : 0;

    const numUsers = userStore.getAllUsers().length;

    const viewData = {
      title: "App Statistics",
      stats: {
        displayNumCategories: numCategories,
        displayNumMovies: numMovies,
        displayAvgRating: avgRating,
        displayNumUsers: numUsers
      }
    };

    response.render("start", viewData);
  },
};

export default start;