'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";
import stats from './controllers/stats.js';


import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import accounts from './controllers/accounts.js';



router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/category/:title', dashboard.viewCategory);
router.post('/category/:title/addmovie',dashboard.addMovie);
router.get('/category/:title/deletemovie/:id', dashboard.deleteMovie);
router.post('/category/:title/editmovie/:id', dashboard.editMovie);
router.get('/stats', stats.createView);
router.get('/searchMovies', dashboard.searchMovies);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);







router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;