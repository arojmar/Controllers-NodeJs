const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController.js');


/* USERS ROUTES */
router.get('/', usersController.listUsers);

router.get('/registerNewUser', usersController.registerNewUser);

router.post('/saveUser', usersController.saveUser);

router.get('/editUser/:idUser', usersController.editUser);

router.post('/updateUser/:idUser', usersController.updateUser);

router.get('/removeUser/:idUser', usersController.removeUser);

module.exports = router;
