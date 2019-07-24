const fs = require('fs');

module.exports = {
    addflightPage: (req, res) => {
        res.render('add-flight.ejs', {
            title: "Add a new flight"
            ,message: ''
        });
    },
    addflight: (req, res) => {
        

        let message = '';
        let datestart = req.body.datestart;
        let dateend = req.body.dateend;
        let flight_from = req.body.flight_from;
        let flight_to = req.body.flight_to;
        let seats = req.body.seats;
        let cost = req.body.cost;
        
        let usernameQuery = "SELECT * FROM flights WHERE datestart = '" + datestart + "' and dateend = '"+dateend+"' and flight_from = '"+flight_from+"' and flight_to = '"+flight_to+ "' and seats = '" + seats+ "' and cost = '"+cost+"'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Flight already exists';
                res.render('add-flight.ejs', {
                    message,
                    title: "Add a new flight"
                });
            } else {
                        // send the flight's details to the database
                        let query = "INSERT INTO `flights` (datestart, dateend,flight_from,flight_to, seats, cost) VALUES ('" +
                            datestart + "', '" + dateend +"', '" + flight_from +"', '" + flight_to + "', '" + seats + "', '" + cost  + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        }); 
            }
        });
    },
    editflightPage: (req, res) => {
        let flightId = req.params.id;
        let query = "SELECT * FROM `flights` WHERE id = '" + flightId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-flight.ejs', {
                title: "Edit  flight"
                ,flight: result[0]
                ,message: ''
            });
        });
    },
    editflight: (req, res) => {
        let flightId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `flights` SET `datestart` = '" + datestart + "', `dateend` = '" + dateend + "', `flight_from` = '" + flight_from + "', `flight_to` = '" + flight_to + "', `seats` = '" + seats + "', `cost` = '" + cost + "' WHERE `flights`.`id` = '" + flightId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteflight: (req, res) => {
        let flightId = req.params.id;
        let deleteUserQuery = 'DELETE FROM flights WHERE id = "' + flightId + '"';

                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
             
    }
};
