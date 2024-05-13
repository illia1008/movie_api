const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "user1",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "user2",
        favoriteMovies: ["The Shawshank Redemption"]
    },
];

let movies = [
    {
        "Title": "The Shawshank Redemption",
        "Description": "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
        "Genre": {
            "Name": "Drama",
            "Description": "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Frank Darabont",
            "Bio": `Frank Darabont, born on January 28, 1959, is a Hungarian-American filmmaker known for his exceptional work as a director, screenwriter, and producer. He made his mark with "The Shawshank Redemption" (1994), based on Stephen King's novella, which later became a cinematic classic despite its initial box office reception. Darabont continued his collaboration with King, directing the critically acclaimed "The Green Mile" (1999), earning multiple Academy Award nominations. He showcased his versatility with projects like the film adaptation of John Steinbeck's "The Mist" (2007). Darabont's venture into television with AMC's "The Walking Dead" (2010) further highlighted his storytelling prowess, setting a high standard for the series' debut season. Throughout his career, Darabont has consistently delivered compelling narratives, solidifying his status as a visionary filmmaker in both film and television.`,
            "Birth": 1959
        },
        "ImageURL": "https://upload.wikimedia.org/wikipedia/commons/1/19/Frank_Darabont_at_the_PaleyFest_2011_-_The_Walking_Dead_panel.jpg",
        "Featured": false
    },

    {
        "Title": "The Godfather",
        "Description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        "Genre": {
            "Name": "Drama",
            "Description": "In film and television, drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        "Director": {
            "Name": "Francis Ford Coppola",
            "Bio": `Francis Ford Coppola, born on April 7, 1939, in Detroit, Michigan, is an iconic American filmmaker celebrated for his groundbreaking contributions to cinema. Rising to prominence in the 1970s, Coppola's directorial masterpiece, "The Godfather" (1972), became a cultural phenomenon, earning him widespread acclaim and multiple Academy Awards. He solidified his status with the sequel, "The Godfather Part II" (1974), making cinematic history by becoming the first director to win consecutive Oscars for Best Picture. Coppola's diverse portfolio includes the epic Vietnam War film "Apocalypse Now" (1979), renowned for its technical innovation and profound storytelling.`,
            "Birth": 1939
        },
        "ImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Francis_Ford_Coppola_%2833906700778%29_%28cropped%29.jpg/1280px-Francis_Ford_Coppola_%2833906700778%29_%28cropped%29.jpg",
        "Featured": false
    },
    
];

// Creat new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Write user name');
    }
})

//Delete user
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send('user was deleted');
    } else {
        res.status(400).send('User  is not found');
    }
})

//Update user info
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('User is not found');
    }
})

// View all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// View info about movie by it's title
app.get('/movies/:title', (req, res) => {
    const {title} = req.params;
    const movie = movies.find( movie => movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie title is not found');
    }
})

// View info about genre
app.get('/movies/genre/:genreType', (req, res) => {
    const {genreType} = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreType ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('This genre is not found');
    }
})

// View info about director
app.get('/movies/directors/:directorName', (req, res) => {
    const {directorName} = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('Director is not found');
    }
})

//Add movie to favorites
app.post('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send('Movie has bees added to user favorites');
    } else {
        res.status(400).send('User  is not found');
    }
})

//Delete movie from favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send('Movie has been deleted from user favorites');
    } else {
        res.status(400).send('User  is not found');
    }
})

app.listen(8080, () => {
    console.log('My app is listening on port 8080.');
});