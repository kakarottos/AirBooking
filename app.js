const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addtouristPage, addtourist, deletetourist, edittourist, edittouristPage} = require('./routes/tourist');
const {addflightPage, addflight, deleteflight, editflight, editflightPage} = require('./routes/flight');
const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'airbooking',
    multipleStatements: true
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

//tourists
app.get('/', getHomePage);
app.get('/addTourist', addtouristPage);
app.get('/editTourist/:id', edittouristPage);
app.get('/deleteTourist/:id', deletetourist);
app.post('/addTourist', addtourist);
app.post('/editTourist/:id', edittourist);

//flight
app.get('/addFlight', addflightPage);
app.get('/editFlight/:id', editflightPage);
app.get('/deleteFlight/:id', deleteflight);
app.post('/addFlight', addflight);
app.post('/editFlight/:id', editflight);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}); 