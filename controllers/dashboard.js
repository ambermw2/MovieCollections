'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from "./accounts.js";

const dashboard = {

  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Dashboard page loading!");
    const categories = appStore.getAllCategories().map(cat => ({
      title: cat.title,
      image: cat.image
    }));

    const viewData = {
      title: "Movie Collections",
      categories
    };

    logger.debug(viewData.categories);
    response.render('dashboard', viewData);
  },

  viewCategory(request, response) {
    const categoryTitle = request.params.title;
    logger.info(`Loading category: ${categoryTitle}`);

    const category = appStore.getAllCategories().find(c => c.title === categoryTitle);

    if (!category) {
      response.status(404).send("Category not found");
      return;
    }

    const viewData = {
      title: category.title,
      movies: category.items,
      image: category.image,
      category: category
    };

    logger.debug(viewData);
    response.render('category', viewData);
  },

  addMovie(request, response) {
    const categoryTitle = request.params.title;

    const newMovie = {
      id: uuidv4(),
      title: request.body.title,
      director: request.body.director,
      rating: parseInt(request.body.rating)
    };

    appStore.addMovieToCategory(categoryTitle, newMovie);
    response.redirect('/category/' + categoryTitle);
  },

  deleteMovie(request, response) {
    const categoryTitle = request.params.title;
    const movieId = request.params.id;

    appStore.deleteMovie(categoryTitle, movieId);
    response.redirect('/category/' + categoryTitle);
  },

  editMovie(request, response) {
    const categoryTitle = request.params.title;
    const movieId = request.params.id;

    const updateMovie = {
      title: request.body.title,
      director: request.body.director,
      rating: parseInt(request.body.rating),
    };

    appStore.editMovie(categoryTitle, movieId, updateMovie);
    response.redirect('/category/' + categoryTitle);
  },

  searchMovies(request, response) {
    logger.info("Movie search page loading!");

    const searchTerm = request.query.searchTerm || "";

    const movies = searchTerm
      ? appStore.searchMovies(searchTerm)
      : appStore.getAllMovies();

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    let sorted = movies;

    if (sortField) {
      sorted = movies.slice().sort((a, b) => {
        const aTitle = typeof a === "string" ? a : (a.title || "");
        const bTitle = typeof b === "string" ? b : (b.title || "");
        const aRating = typeof a === "string" ? 0 : (a.rating || 0);
        const bRating = typeof b === "string" ? 0 : (b.rating || 0);

        if (sortField === "title") {
          return aTitle.localeCompare(bTitle) * order;
        }
        if (sortField === "rating") {
          return (aRating - bRating) * order;
        }
        return 0;
      });
    }

    const viewData = {
      title: "Movie Search",
      movies: sorted,
      search: searchTerm,
      titleSelected: sortField === "title",
      ratingSelected: sortField === "rating",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    response.render("search", viewData);
  },

  addCategory(request, response) {
    const newCategory = {
      title: request.body.title,
      image: "/images/" + request.file.filename,
      items: []
    };
    appStore.addCategory(newCategory);
    response.redirect('/dashboard');
  },
  deleteCategory(request, response){
    const categoryTitle = request.params.title;
    appStore.deleteCategory(categoryTitle);
    response.redirect('/dashboard');
  }
}



export default dashboard;