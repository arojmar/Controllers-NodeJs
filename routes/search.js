const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController.js');


/* SEARCH ROUTES */
router.post('/', searchController.showSearch);

module.exports = router;
