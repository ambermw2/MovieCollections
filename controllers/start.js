'use strict';

import logger from "../utils/logger.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    response.render("start");
  },
};

export default start;