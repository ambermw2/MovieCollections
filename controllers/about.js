'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from "./accounts.js";

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");

   

  
    const viewData = {
      title: "About the Movie app",
      aboutInfo: appStore.getAboutInfo()
      
    };

    response.render('about', viewData);
  }
  
};

export default about;