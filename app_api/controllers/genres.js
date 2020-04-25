const mongoose = require('mongoose');
const Genre = mongoose.model('Genre');

// Genres: Get All
const genresAll = (req, res) => {
  Genre
    .find()
    .exec((err, genres) => {
      // Test for no results and error
      if (!genres) {
        return res.status(404).json({"message": "Genres not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Genres have been found');
      res.status(200).json(genres);
    });
};

// Genres: Get Available
const genresAvailable = (req, res) => {
  Genre
    .find({active: "true"})
    .exec((err, genres) => {
      // Test for no results and error
      if (!genres) {
        return res.status(404).json({"message": "Genres not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Active genres have been found');
      res.status(200).json(genres);
    });
};

// Genres: Create
const genresCreate = (req, res) => {
  // Create data object
  let active = true;
  if (req.body.active !== 'undefined') {
    active = req.body.active;
  }
  const data = {
    "genre": req.body.genre,
    "active": active
  };

  // Create genre record
  Genre
    .create(data, (err, genre) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log('Genre has been created');
        res.status(201).json(genre);
      }
    });
};

// Genres: Get one
const genresOne = (req, res) => {
  const genreId = req.params.genreId;

  Genre
    .findById(genreId)
    .exec((err, genre) => {
      // Test for no results and error
      if (!genre) {
        return res.status(404).json({"message": "Genre not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Genre has been found');
      res.status(200).json(genre);
    });
};

// Genres: Update one
const genresUpdateOne = (req, res) => {
  const genreId = req.params.genreId;
  const newGenreValue = req.body.genre;
  const newActiveValue = req.body.active;

  // Find specific record to update
  Genre
    .findById(genreId)
    .exec((err, genre) => {
      // Test for no results and error
      if (!genre) {
        return res.status(404).json({"message": "Genre not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change value and save
      genre.genre = newGenreValue;
      genre.active = newActiveValue;

      genre
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log('Genre has been updated');
            res.status(200).json(genre);
          }
        });
    });
};

// Genres: Delete one
const genresDeleteOne = (req, res) => {
  const genreId = req.params.genreId;
  const newActiveValue = req.body.active;

  // Find specific record to update
  Genre
    .findById(genreId)
    .exec((err, genre) => {
      // Test for no results and error
      if (!genre) {
        return res.status(404).json({
          "message": "Genre not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change active status and save
      genre.active = newActiveValue;
      genre
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log('Genre active status saved');
            res.status(200).json(genre);
          }
        });
    });
};

// Export Genre functions
module.exports = {
  genresAll,
  genresAvailable,
  genresCreate,
  genresOne,
  genresUpdateOne,
  genresDeleteOne
};
