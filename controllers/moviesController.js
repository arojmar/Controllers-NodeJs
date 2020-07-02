const connection = require('../config/db.js');
const moviesController = {};


moviesController.listMovies = (req, res, next) => {
    let sqlList = `SELECT * FROM movie;`;
    connection.query(sqlList, (err, resultList) =>{
        if(err) throw err;
        res.render('movies/movies', {resultList});
    });
};

moviesController.registerNewMovie = (req, res, next) => {
    res.render('movies/registerNewMovie');
};

moviesController.saveMovie = (req, res, next) => {
    let {titleMovie, descriptionMovie,
         releaseDateMovie, genderMovie} = req.body;

    let sqlSave = `INSERT INTO movie (title, description, release_date, gender)
                    VALUES ('${titleMovie}','${descriptionMovie}',
                    '${releaseDateMovie}', '${genderMovie}');`;

    connection.query(sqlSave, (err, resultSave) =>{
        if(err) throw err;
        res.redirect('/movies');
    });

};

moviesController.editMovie = (req, res, next) => {
    let idMovie = req.params.idMovie;

    let sqlEdit = `SELECT * FROM movie WHERE id_movie = ${idMovie};`;
    connection.query(sqlEdit, (err, resultEdit)=>{
        if(err) throw err;
        res.render('movies/editMovie', { resultEdit : resultEdit[0] });
    });
};

moviesController.updateMovie = (req, res, next) => {
    let idMovie = req.params.idMovie;
    let {titleMovie, descriptionMovie,
        releaseDateMovie, genderMovie} = req.body;

    let sqlUpdate = `UPDATE movie SET title = '${titleMovie}', 
                    description = '${descriptionMovie}', 
                    release_date = '${releaseDateMovie}',
                    gender = '${genderMovie}'
                    WHERE id_movie = ${idMovie};`;
    connection.query(sqlUpdate, (err, resultUpdate) => {
        if(err) throw err;
        res.redirect('/movies');
    });
};

moviesController.removeMovie = (req, res, next) => {
    let idMovie = req.params.idMovie;

    let sqlRemove = `DELETE FROM movie WHERE id_movie = ${idMovie};`;

    connection.query(sqlRemove, (err, resultRemove) => {
        if(err) throw err;
        res.redirect('/movies');
    });
};



module.exports = moviesController;