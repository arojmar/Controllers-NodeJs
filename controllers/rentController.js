const connection = require('../config/db.js');
const rentController = {};


rentController.listRent = (req, res) => {
    let sqlList = `SELECT rent.id_rent as id_rent, 
                          movie.title as title,
                          customer.name as customer  
                    FROM rent 
                    JOIN movie ON rent.id_movie = movie.id_movie
                    JOIN customer ON rent.id_user = customer.id_user;`;
    connection.query(sqlList, (err, resultList) =>{
        if(err) throw err;
        let sqlListMovies = `SELECT id_movie, title FROM movie;`;
        connection.query(sqlListMovies, (err, resultMovies) => {
            if(err) throw err;
            let sqlListUsers = `SELECT id_user, name, last_name FROM customer;`;
            connection.query(sqlListUsers, (err, resultUsers) => {
                if(err) throw err;
                res.render('rent/rent', {resultList, resultMovies, resultUsers});
            });
        });
    });
}

rentController.rentMovie = (req, res) => {
    let idUser = req.body.idUser;
    let idMovie = req.body.idMovie;

    let sqlRent = `INSERT INTO rent (id_user, id_movie)
                        VALUES (${idUser},${idMovie});`;

    connection.query(sqlRent, (err, resultList) =>{
        if(err) throw err;
        res.redirect('/rent');
    });
}

rentController.editRent = (req, res) => {
    let idRent = req.params.idRent;
    let sqlEdit = `SELECT rent.id_rent as id_rent,
                            rent.id_user as id_user,
                            rent.id_movie as id_movie, 
                            movie.title as title,
                            concat(customer.name, ' ', customer.last_name)
                             as customer    
                    FROM rent 
                    JOIN movie ON rent.id_movie = movie.id_movie
                    JOIN customer ON rent.id_user = customer.id_user
                    WHERE id_rent = ${idRent};`;
    connection.query(sqlEdit, (err, resultList) =>{
        if(err) throw err;
        let sqlListMovies = `SELECT id_movie, title FROM movie;`;
        connection.query(sqlListMovies, (err, resultMovies) => {
            if(err) throw err;
            let sqlListUsers = `SELECT id_user, name, last_name 
                                FROM customer;`;
            connection.query(sqlListUsers, (err, resultUsers) => {
                if(err) throw err;
                res.render('rent/editRent', {resultList : resultList[0],
                     resultMovies, resultUsers});
            });
        });
    });
}

rentController.updateRent = (req, res) => {
    let idRent = req.params.idRent;
    let idUser = req.body.idUser;
    let idMovie = req.body.idMovie;
    let sqlEdit = `UPDATE rent
                    SET id_user = ${idUser}, id_movie = ${idMovie}
                    WHERE id_rent = ${idRent};`;
    connection.query(sqlEdit, (err, resultUpdate) =>{
        if(err) throw err;
        res.redirect('/rent');
    });
}

rentController.removeRent = (req, res) => {
    let idRent = req.params.idRent;
    let sqlRemove = `DELETE FROM rent WHERE id_rent = ${idRent};`;

    connection.query(sqlRemove, (err, resultRemove) => {
        if(err) throw err;
        res.redirect('/rent');
    });

}


module.exports = rentController;