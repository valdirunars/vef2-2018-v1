//
// app.js
// -----------------------

const express = require('express');
const routes = require('./routes');

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Share public folder
app.use(express.static('public'));

// Set up routes see "./routes.js"
routes.configure(app);

// Handle 404
app.use('*', (_, res) => {
  res.status(404);
  res.render('error', {
    title: 'Fannst ekki',
    text: 'Ó nei, efnið fannst ekki',
  });
});

// Handle 500
app.use('*', (error, req, res, next) => { // eslint-disable-line no-unused-vars
  res.render('error', {
    title: 'Villa kom upp',
    text: '',
  });
});

const hostname = '127.0.0.1';
const port = 1337;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
