"use strict";
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from "./accounts.js";

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser){
    logger.info("Stats page loading!");

    const categories = appStore.getAllCategories();

    const numCategories = categories.length;

    const movies = categories.flatMap(category =>
      category.items ? category.items : []
    );

    const numMovies = movies.length;

    const average =
      numCategories > 0 ? (numMovies / numCategories).toFixed(2) : 0;

    const ratedMovies = movies.filter(movie => movie.rating);

    const totalRating = ratedMovies.reduce(
      (total, movie) => total + parseInt(movie.rating),
      0
    );

    const avgRating =
      ratedMovies.length > 0 ? (totalRating / ratedMovies.length).toFixed(2) : 0;

    const ratings = ratedMovies.map(movie => parseInt(movie.rating));
    const maxRating = ratings.length > 0 ? Math.max(...ratings) : 0;

    const maxRated = ratedMovies.filter(
      movie => parseInt(movie.rating) === maxRating
    );

    const favTitles = maxRated.map(movie => movie.title).join(", ");

    const largestCategory = categories.reduce((largest, category) => {
        const currentSize = category.items ? category.items.length : 0;
        const largestSize = largest.items ? largest.items.length : 0;
        return currentSize > largestSize ? category : largest;
    }, categories[0] || {});

    const statistics = {
      displayNumCategories: numCategories,
      displayNumMovies: numMovies,
      displayAverage: average,
      displayAvgRating: avgRating,
      displayMaxRating: maxRating,
      displayFavTitles: favTitles,
      displayLargestCategory: largestCategory.title
    };

    const viewData = {
      title: "Movie Collection Statistics",
      stats: statistics,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
    };

    response.render("stats", viewData);
}
else response.redirect('/');
  },
};

export default stats;