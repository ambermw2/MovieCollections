'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");

    const aboutInfo = appStore.getAboutInfo();

    const viewData = {
      title: "About My Webpage",
      author: aboutInfo.author,
      company: aboutInfo.company,
      email: aboutInfo.email,
      phone: aboutInfo.phone,
      location: aboutInfo.location,
      stats: aboutInfo.stats
    };

    response.render('about', viewData);
  }
};

export default about;