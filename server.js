const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db'
  },
  console.log(`Connected to the movie_db database.`)
);

app.post('/api/add-movie', (req, res) => {
    //TODO: add db query
});

app.get('/api/movies', (req, res) => {
    //TODO: add db query
});

app.delete('/api/movie/:id', (req, res) => {
    //TODO: add delete query
    console.log(req.params);
});

app.get('/api/movie-reviews', (req, res) => {
    //TODO: add join query
});

app.put('/api/review/:id', (req, res) => {
    //TODO: add update query
    console.log(req.params);
});

app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });