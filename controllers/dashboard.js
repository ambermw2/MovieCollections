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

    logger.debug(viewData.categories);

    response.render('dashboard', viewData);
  },
};

export default dashboard;