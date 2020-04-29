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
};

// Users:
const usersActive = (req, res) => {
  res.status(200).json({"message": "usersActive"})
};

// Users:
const usersOne = (req, res) => {
  res.status(200).json({"message": "usersOn"})
};

// Users:
const usersUpdateOne = (req, res) => {
  res.status(200).json({"message": "usersUpdateOn"})
};

// Users:
const usersDeleteOne = (req, res) => {
  res.status(200).json({"message": "usersDeleteOne"})
};

// Export User functions
module.exports = {
  usersAll,
  usersCreate,
  usersActive,
  usersOne,
  usersUpdateOne,
  usersDeleteOne
};
