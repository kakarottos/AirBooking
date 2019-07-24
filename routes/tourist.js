const fs = require('fs');

module.exports = {
    addtouristPage: (req, res) => {
        let flightListQuery = "Select * from flights";

        db.query(flightListQuery,(err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('add-tourist.ejs', {
                title: "Add a new tourist"
            ,message: ''
            ,flightList : result
            });
        });

    },
    addtourist: (req, res) => {
        
        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let gender = req.body.gender;
        let country = req.body.country;
        let note = req.body.note;
        let birth_date = req.body.birth_date;
        let flightsId = req.body.flights;
        
        let userQuery = "SELECT * FROM `tourists` WHERE first_name = '" + first_name + "' and last_name = '"+last_name+"' and gender = '"+gender+"' and birth_date = '"+birth_date+"' and flightsId = "+flightsId+"'";


        db.query(userQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Tourist already exists';
                res.render('add-tourist.ejs', {
                    message,
                    title: "Add a new tourist"
                });
            } else {
                        // send the tourist's details to the database
                        let query = "INSERT INTO `tourists` (first_name, last_name, gender, country, note,birth_date,flightsId) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + gender + "', '" + country +"', '" + note + "', '" + birth_date +"', '" + flightsId + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        }); 
            }
        });
    },
    edittouristPage: (req, res) => {
        let touristId = req.params.id;
        let query = "SELECT * FROM `tourists` WHERE id = '" + touristId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-tourist.ejs', {
                title: "Edit  tourist"
                ,tourist: result[0]
                ,message: ''
            });
        });
    },
    edittourist: (req, res) => {
        let touristId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let gender = req.body.gender;
        let country = req.body.country;
        let note = req.body.note;
        let birth_date = req.body.birth_date;
        let flightsId = req.body.flights;

        let query = "UPDATE `tourists` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `gender` = '" + gender + "', `country` = '" + country + "', `note` = '" + note + "', `birth_date` = '"+ birth_date + "', `flightsId` = '"+ flightsId+ "' WHERE `tourists`.`id` = '" + touristId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletetourist: (req, res) => {
        let touristId = req.params.id;
        let deleteUserQuery = 'DELETE FROM tourists WHERE id = "' + touristId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
             
    }
};
