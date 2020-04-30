const mongoose = require('mongoose');
const Role = mongoose.model('Role');

// Roles: Get all
const rolesAll = (req, res) => {
  console.log("rolesAll suddess");
  res.status(200).json({"message": "rolesAll success"})
};

// Roles: Create
const rolesCreate = (req, res) => {
  console.log("rolesCreate suddess");
  res.status(200).json({"message": "rolesCreate success"})
};

// Roles: Get active
const rolesActive = (req, res) => {
  console.log("rolesActive suddess");
  res.status(200).json({"message": "rolesActive success"})
};

// Roles: Get one
const rolesOne = (req, res) => {
  console.log("rolesOne suddess");
  res.status(200).json({"message": "rolesOne success"})
};

// Roles: Update one
const rolesUpdateOne = (req, res) => {
  console.log("rolesUpdateOne suddess");
  res.status(200).json({"message": "rolesUpdateOne success"})
};

// Roles: Delete one
const rolesDeleteOne = (req, res) => {
  console.log("rolesDeleteOne suddess");
  res.status(200).json({"message": "rolesDeleteOne success"})
};

// Determin active
function _isActive(data = 'undefined') {
  return (data !== 'undefined') ? data : true;
}

// Export Role funcion
module.exports = {
  rolesAll,
  rolesCreate,
  rolesActive,
  rolesOne,
  rolesUpdateOne,
  rolesDeleteOne
};
