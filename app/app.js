//
// app.js
// -----------------------

const express = require('express');
const routes = require('./routes');
const path = require("path")
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Share public folder
app.use(express.static('public'));

// Set up routes see "./routes.js"
routes.configure(app);

app.get('/fail/sync', function(req, res) {
   throw new Error('whoops');
});

// Handle 404
app.use("*", function(req, res) {
    res.status(404)
    res.render('error', {
        title: "Fannst ekki",
        text: "Ó nei, efnið fannst ekki"
    });
});

// Handle 500
app.use("*", function(error, req, res, next) {
    res.render('error', {
        title: "Villa kom upp",
        text: ""
    });
});

const hostname = '127.0.0.1';
const port = 1337;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
