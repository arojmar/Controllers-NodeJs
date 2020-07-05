const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');
const connection = require('../config/db.js');
const { keyPass } = require('../config/key.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let authentication = false;
  res.render('index', {authentication});
});

router.post('/', function(req, res, next) {
  let email = req.body.emailUser;
  let password = sha1(req.body.passwordUser);
  let sqlAuthentication = `SELECT CONCAT(name, ' ', last_name) as customer,
                            email, password FROM customer
                            WHERE email = '${email}' 
                            AND password = '${password}';`;

  connection.query(sqlAuthentication, (err, resultAuthentication) => {
    if(err) throw err;
    let authentication = true;
    if(!resultAuthentication[0]){
      authentication = false;
      res.render('index', { authentication })
    }
    const token = jwt.sign({resultAuthentication}, keyPass);
    res.render('index', {resultAuthentication : resultAuthentication[0],
                          authentication, token});
  });
 
});

module.exports = router;
