const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    db.query("INSERT INTO movies(movie_name) VALUES(?)", req.body.movie_name, (err, results) => {
        if (err) {
            console.log(err);
          } else {
            res.send("Movie Successfully Added!")
          }
    })
});

app.get('/api/movies', (req, res) => {
    db.query("SELECT movie_name as 'Movie Name' FROM movies;", (err, results) => {
        if (err) {
            console.log(err);
          }
        console.table(results);
        res.json(results);
    }) 
});

app.delete('/api/movie/:id', (req, res) => {
    console.log(req.params);
    db.query("DELETE FROM movies WHERE id=?;", req.params.id, (err, results) => {
        if (err) {
            console.log(err);
          } else {
            res.send("Movie Successfully Deleted!")
          }
    })
});

app.get('/api/movie-reviews', (req, res) => {
    db.query("SELECT m.movie_name as 'Movie Name', r.review FROM movies m JOIN reviews r on m.id = r.movie_id;", (err, results) => {
      if (err) {
          console.log(err);
        }
      console.table(results);
      res.json(results);
  }) 
});

app.put('/api/review/:id', (req, res) => {
    db.query("UPDATE reviews SET review =? WHERE id=?;", [req.body.review, req.params.id], (err, results) => {
      if (err) {
          console.log(err);
        } else {
          res.send("Review Successfully Updated!")
        }
  })
});

app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });