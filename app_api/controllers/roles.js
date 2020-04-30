const mongoose = require('mongoose');
const Role = mongoose.model('Role');

// Roles: Get all
const rolesAll = (req, res) => {
  Role
    .find()
    .exec((err, roles) => {
      if (!roles) {
        return res.status(404).json({"message": "Roles not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log("Roles have been found");
      res.status(200).json(roles);
    });
};

// Roles: Create
const rolesCreate = (req, res) => {
  // Create data object
  const active = _isActive(req.body.active);
  const data = {
    "title": req.body.title,
    "active": active
  };

  // Create role record
  Role
    .create(data, (err, role) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log('Role has been created');
        res.status(201).json(role);
      }
    });
}; // Working

// Roles: Get active
const rolesActive = (req, res) => {
  Role
    .find({active: "true"})
    .exec((err, roles) => {
      if (!roles) {
        return res.status(404).json({
          "message": "Roles not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log("Roles have been found");
      res.status(200).json(roles);
    });
}; // Working

// Roles: Get one
const rolesOne = (req, res) => {
  const roleId = req.params.roleId;

  Role
    .findById(roleId)
    .exec((err, role) => {
      if (!role) {
        return res.status(404).json({"message": "Role not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log("Role has been found");
      res.status(200).json(role);
    });
}; // Working

// Roles: Update one
const rolesUpdateOne = (req, res) => {
  const roleId = req.params.roleId;

  Role
    .findById(roleId)
    .exec((err, role) => {
      if (!role) {
        return res.status(404).json({
          "message": "Role not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change values and save
      role.active = _isActive(req.body.active);
      role.title = req.body.title;
      role
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log("Role active status saved");
            res.status(200).json(results);
          }
        });
    });
}; // Working

// Roles: Delete one
const rolesDeleteOne = (req, res) => {
  const roleId = req.params.roleId;

  Role
    .findById(roleId)
    .exec((err, role) => {
      if (!role) {
        return res.status(404).json({
          "message": "Role not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change active status and save
      role.active = _isActive(req.body.active);
      role
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log("Role active status saved");
            res.status(200).json(role);
          }
        });
    });
}; // Working

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
