const express = require('express');
morgan = require('morgan');
const app = express();

let top10Movies = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List",
    'The Lord of the Rings: The Return of the King',
    'Pulp Fiction',
    'Fight Club',
    'Inception',
    'Terminator 2: Judgment Day'
];

app.use(morgan('common'));

app.get('/', (req, res) => {
    res.send('Welcome to my movie app!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
    res.json(top10Movies);
});

app.listen(8080, () => {
    console.log('My app is listening on port 8080.');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  res.status(500).send('There is an error!');
});