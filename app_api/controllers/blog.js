const mongoose = require('mongoose');

// Require the model
const Blog = mongoose.model('Blog');

// Blogs: Get all
const blogsAll = (req, res) => {
  res.status(200).json({"message": "blogsAll: success"});
};

// Blogs: Blogs Active
const blogsActive = (req, res) => {
  res.status(200).json({"message": "blogsActive: success"});
};

// Blogs: Create
const blogsCreate = (req, res) => {
  console.log(req.file);
  res.status(200).json({"message": "blogsCreate: success"});
};

// Blogs: Get One
const blogsOne = (req, res) => {
  res.status(200).json({"message": "blogsOne: success"});
};

// Blogs: Update One
const blogsUpdateOne = (req, res) => {
  res.status(200).json({"message": "blogsUpdateOne: success"});
};

// Blogs: Delete One
const blogsDeleteOne = (req, res) => {
  res.status(200).json({"message": "blogsDeleteOne: success"});
};

// Determin active
function _isActive(data = 'undefined') {
  return (data !== 'undefined') ? data : true;
}

// Export Book functions
module.exports = {
  blogsAll,
  blogsActive,
  blogsCreate,
  blogsOne,
  blogsUpdateOne,
  blogsDeleteOne
};
