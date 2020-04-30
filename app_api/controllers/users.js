const mongoose = require('mongoose');
const User = mongoose.model('User');

// Users:
const usersAll = (req, res) => {
  User
    .find()
    .exec((err, users) => {
      // Test for no results and error
      if (!users) {
        return res.status(404).json({"message": "Users not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Users have been found');
      res.status(200).json(users);
    });
}; // Working

// Users:
const usersCreate = (req, res) => {
  // Create data object
  const active = _isActive(req.body.active);
  const data = {
    "username": req.body.username,
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "password": req.body.password,
    "role": req.body.role,
    "created": new Date(),
    "updated": new Date(),
    "active": active
  };

  // Create genre record
  User
    .create(data, (err, genre) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log('User has been created');
        res.status(201).json(genre);
      }
    });
}; // Working

// Users:
const usersActive = (req, res) => {
  User
    .find({active: "true"})
    .exec((err, users) => {
      // Test for no results and error
      if (!users) {
        return res.status(404).json({
          "message": "Users not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Users have been found');
      res.status(200).json(users);
    });
}; // Working

// Users:
const usersOne = (req, res) => {
  const userId = req.params.userId;
  User
    .findById(userId)
    .exec((err, user) => {
      // Test for no results and error
      if (!user) {
        return res.status(404).json({
          "message": "User not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('User have been found');
      res.status(200).json(user);
    });
}; // Working

// Users:
const usersUpdateOne = (req, res) => {
  const userId = req.params.userId;
  User
    .findById(userId)
    .exec((err, user) => {
      // Test for no results and error
      if (!user) {
        return res.status(404).json({"message": "Users not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change values and save
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.password = req.body.password;
      user.role = req.body.role;
      user.updated = new Date();
      user.active = _isActive(req.body.active);

      user
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log('Users have been found');
            res.status(200).json(results);
          }
        });
    });
}; // Working

// Users:
const usersDeleteOne = (req, res) => {
  const userId = req.params.userId;

  // Find specific record to update
  User
    .findById(userId)
    .exec((err, user) => {
      // Test for no results and error
      if (!user) {
        return res.status(404).json({"message": "User not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change active status and save
      user.active = _isActive(req.body.active);
      user
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log('User active status saved');
            res.status(200).json(results);
          }
        });
    });
}; // Working

// Determin active
function _isActive(data = 'undefined') {
  return (data !== 'undefined') ? data : true;
}

// Export User functions
module.exports = {
  usersAll,
  usersCreate,
  usersActive,
  usersOne,
  usersUpdateOne,
  usersDeleteOne
};
