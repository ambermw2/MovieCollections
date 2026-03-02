'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const dashboard = {

  createView(request, response) {
    logger.info("Dashboard page loading!");
    const categories = appStore.getAllCategories().map(cat => ({
      title: cat.title,
      image: cat.image
    }));
    
    const viewData = {
      title: "Movie Collections",
      categories
    };
    
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
      image: category.image
    };

    logger.debug(viewData);

    response.render('category', viewData);
  }

};

export default dashboard;