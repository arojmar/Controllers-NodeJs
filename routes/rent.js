const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rentController.js');


/* RENT ROUTES */
router.get('/', rentController.listRent);

router.post('/rentMovie', rentController.rentMovie);

router.get('/editRent/:idRent', rentController.editRent);

router.post('/updateRent/:idRent', rentController.updateRent);

router.get('/removeRent/:idRent', rentController.removeRent);

module.exports = router;
