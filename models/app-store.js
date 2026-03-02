'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const appStore = {

  store: new JsonStore('./models/app-store.json', { categories: [] }),
  collection: 'categories',

  getAllCategories(){
    return this.store.findAll(this.collection)
  },

   getCategory(title) {
    return this.store.findOneBy(this.collection, { title });
  },

   getAppInfo() {
    return {
      name: 'Movie Collection App',
      version: '1.0'
    };
}
};

export default appStore;
