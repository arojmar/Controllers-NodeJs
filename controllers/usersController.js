const connection = require('../config/db.js');
const usersController = {};


usersController.listUsers = (req, res) => {
    let sqlList = `SELECT * FROM customer;`;
    connection.query(sqlList, (err, resultList) =>{
        if(err) throw err;
        res.render('users/users', {resultList});
    });
}

usersController.registerNewUser = (req, res) => {
    res.render('users/registerNewUser');
}

usersController.saveUser = (req, res) => {
    let name = req.body.nameUser;
    let lastName = req.body.lastNameUser;
    let phone = req.body.phoneUser;
    let address = req.body.addressUser;

    let sqlSave = `INSERT INTO customer (name, last_name, phone, address)
                    VALUES ('${name}','${lastName}','${phone}',
                    '${address}');`;

    connection.query(sqlSave, (err, resultSave) =>{
        if(err) throw err;
        res.redirect('/users');
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
    let phone = req.body.phoneUser;
    let address = req.body.addressUser;

    let sqlUpdate = `UPDATE customer SET name = '${name}', 
                    last_name = '${lastName}', 
                    phone = '${phone}',
                    address = '${address}'
                    WHERE id_user = ${idUser};`;
    connection.query(sqlUpdate, (err, resultUpdate) => {
        if(err) throw err;
        res.redirect('/users');
    });
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