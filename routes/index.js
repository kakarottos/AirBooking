module.exports = {
    getHomePage: (req, res) => {
        let touristQuery = "SELECT * FROM `tourists` ORDER BY id ASC;"; // query database to get all the tourists
        let flightQuery = "SELECT * FROM `flights` ORDER BY id ASC"; // query database to get all the flights

        // execute query
        db.query(touristQuery+flightQuery,(err, result) => {
            if (err) {
                res.redirect('/');
            }
             res.render('index.ejs', {
                 title: "View "
                 ,tourists: result[0]
                 ,flights: result[1]
             });
        });
     
    },
};