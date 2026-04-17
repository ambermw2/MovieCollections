'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from "./accounts.js";

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");

    const aboutInfo = appStore.getAboutInfo();

    if (loggedInUser){
    const viewData = {
      title: "About the Movie app",
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      
    };

    response.render('about', viewData);
  }
  else response.redirect('/');
},
};

export default about;