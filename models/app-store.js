'use strict';

import JsonStore from './json-store.js';

const appStore = {
  store: new JsonStore('./models/app-store.json', { categories: [] }),
  collection: 'categories',

  getAllCategories() {
    return this.store.findAll(this.collection);
  },

  getCategory(title) {
    return this.getAllCategories().find(category => category.title === title);
  },

  getAppInfo() {
    return {
      name: 'Movie Collection App',
      version: '1.0'
    };
  },

  getAboutInfo() {
    return this.store.findAll('about')[0];
  },

 addMovieToCategory(title, movie) {
    const category = this.getCategory(title);
    if (!category) return;

    if (!category.items) {
      category.items = [];
    }

    category.items.push(movie);
    this.store.db.write();
  },

deleteMovie(title, movieId) {
    const category = this.getCategory(title);
    if (!category) return;

    category.items = category.items.filter(
      movie => movie.id !== movieId
    );
    this.store.db.write();
  },

 editMovie(title, movieId, updateMovie) {
    const category = this.getCategory(title);
    if (!category) return;
    const movie = category.items.find(m => m.id === movieId);
    if (!movie) return;
    movie.title = updateMovie.title;
    movie.director = updateMovie.director;
    movie.rating = updateMovie.rating;
    this.store.db.write();
  },
 getAllMovies() {
  const categories = this.getAllCategories();
  return categories.flatMap(category => category.items ? category.items : []);
},

searchMovies(search) {
  const movies = this.getAllMovies();
  return movies.filter(movie => {
    if (typeof movie === "string") {
      return movie.toLowerCase().includes(search.toLowerCase());
    }

    return (
      (movie.title && movie.title.toLowerCase().includes(search.toLowerCase())) ||
      (movie.director && movie.director.toLowerCase().includes(search.toLowerCase()))
    );
  });
},

getUserMovies(userid) {
  return this.store.findBy(this.collection, (movies => movie.userid === userid));
},

searchUserMovies(search, userid) {
  return this.store.findBy(
    this.collection,
    (movies => movie.userid === userid && movie.title.toLowerCase().includes(search.toLowerCase())))
}, 


};

export default appStore;