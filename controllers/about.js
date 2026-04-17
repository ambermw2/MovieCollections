'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");

   

  
    const viewData = {
      title: "About the Movie app",
      aboutInfo: appStore.getAboutInfo()
      
    };

    response.render('about', viewData);
  }
  
};

export default about;