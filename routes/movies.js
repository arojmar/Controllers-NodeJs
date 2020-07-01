const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController.js');


/* MOVIES ROUTES */
router.get('/', moviesController.listMovies);

router.get('/registerNewMovie', moviesController.registerNewMovie);

router.post('/saveMovie', moviesController.saveMovie);

router.get('/editMovie/:idMovie', moviesController.editMovie);

router.post('/updateMovie/:idMovie', moviesController.updateMovie);

router.get('/removeMovie/:idMovie', moviesController.removeMovie);

module.exports = router;