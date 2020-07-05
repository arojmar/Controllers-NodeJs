const connection = require('../config/db.js');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const key = require('../config/verify.js').keyPass;
const usersController = {};


usersController.listUsers = (req, res) => {
    let sqlList = `SELECT * FROM customer;`;

    connection.query(sqlList, (err, resultList) =>{
        if(err) throw err;
        res.render('users/users', {resultList});
    });
}

usersController.registerNewUser = (req, res) => {
    let message = null;
    res.render('users/registerNewUser', {message});
}

usersController.saveUser = (req, res) => {
    let name = req.body.nameUser;
    let lastName = req.body.lastNameUser;
    let phone = req.body.phoneUser;
    let email = req.body.emailUser;
    let password = sha1(req.body.passwordUser);
    let address = req.body.addressUser;

    let sqlUniqueEmail = `SELECT email FROM customer WHERE email='${email}';`;
    connection.query(sqlUniqueEmail, (err, resultUniqueEmail)=>{
        if(err) throw err;
        if(resultUniqueEmail != undefined){
            let message = 'There is an exisiting user with this email.';
            res.render('users/registerNewUser', { message });
        }
        else{
            let sqlSave = `INSERT INTO customer (name, last_name, email, 
                password, phone, address)
                VALUES ('${name}','${lastName}','${email}','${password}',
                '${phone}','${address}');`;
                connection.query(sqlSave, (err, resultSave) =>{
                    if(err) throw err;
                        res.redirect('/users');
                    
                });
        }        
    });
}

usersController.editUser = (req, res) => {
    let idUser = req.params.idUser;

    let sqlEdit = `SELECT * FROM customer WHERE id_user = ${idUser};`;
    connection.query(sqlEdit, (err, resultEdit)=>{
        if(err) throw err;
        res.render('users/editUser', { resultEdit : resultEdit[0] });
    });
}

usersController.updateUser = (req, res) => {
    let idUser = req.params.idUser;
    let name = req.body.nameUser;
    let lastName = req.body.lastNameUser;
    let email = req.body.emailUser;
    let phone = req.body.phoneUser;
    let address = req.body.addressUser;
    console.log("password", req.body.passwordUser)

    if(req.body.passwordUser == undefined){
        let sqlUpdate = `UPDATE customer SET name = '${name}', 
                        last_name = '${lastName}', 
                        email = '${email}',
                        phone = '${phone}',
                        address = '${address}'
                        WHERE id_user = ${idUser};`;
        connection.query(sqlUpdate, (err, resultUpdate) => {
            if(err) throw err;
            res.redirect('/users');
        });
    } else {
        let password = sha1(req.body.passwordUser);
        let sqlUpdate = `UPDATE customer SET name = '${name}', 
                        last_name = '${lastName}', 
                        email = '${email}',
                        password = '${password}',
                        phone = '${phone}',
                        address = '${address}'
                        WHERE id_user = ${idUser};`;
        connection.query(sqlUpdate, (err, resultUpdate) => {
            if(err) throw err;
            res.redirect('/users');
        });
    }
}

usersController.removeUser = (req, res) => {
    let idUser = req.params.idUser;

    let sqlRemove = `DELETE FROM customer WHERE id_user = ${idUser};`;

    connection.query(sqlRemove, (err, resultRemove) => {
        if(err) throw err;
        res.redirect('/users');
    });
}



module.exports = usersController;