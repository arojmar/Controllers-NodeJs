const connection = require('../config/db.js');
const searchController = {};


searchController.showSearch = (req, res) => {
    let search = req.body.search;

    let sqlSearch = `SELECT * FROM movie 
                    WHERE title like '%${search}%';`;

    connection.query(sqlSearch, (err, resultSearch) =>{
        if(err) throw err;
        let noResults = false;
        if(resultSearch[0] == undefined){
            noResults = true;
        }
        res.render('search/search', { resultSearch, noResults });
    });

}


module.exports = searchController;