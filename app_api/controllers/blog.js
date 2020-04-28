const mongoose = require('mongoose');

// Require the model
const Blog = mongoose.model('Blog');

// Blogs: Get all
const blogsAll = (req, res) => {
  Blog
    .find()
    .sort({'created': -1})
    .exec((err, blogs) => {
      // Test for no results and error
      if (!blogs) {
        return res.status(404).json({"message": "Blogs not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Blogs have been found');
      res.status(200).json(blogs);
    });
}; // Working

// Blogs: Blogs Active
const blogsActive = (req, res) => {
  Blog
    .find({'active': true})
    .sort({'created': -1})
    .exec((err, blogs) => {
      // Test for no results and error
      if (!blogs) {
        return res.status(404).json({"message": "Blogs not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Blogs have been found');
      res.status(200).json(blogs);
    });
}; // Working

// Blogs: Create
const blogsCreate = (req, res) => {
  // Create data object
  const path = require('path');
  const remove = path.join(__dirname, '..', '..', 'public/');
  const imageLocation = req.file.path.replace(remove, '');

  const active = _isActive(req.body.active);

  const data = {
    "title": req.body.title,
    "body": req.body.body,
    "image": imageLocation,
    "author": req.body.author,
    "created": new Date(),
    "updated": new Date(),
    "active": active
  };

  Blog
    .create(data, (err, blog) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log('Blog has been created');
        res.status(201).json(blog);
      }
    });
}; // Working

// Blogs: Get One
const blogsOne = (req, res) => {
  const blogId = req.params.blogId;

  Blog
    .findById(blogId)
    .exec((err, blogs) => {
      // Test for no results and error
      if (!blogs) {
        return res.status(404).json({
          "message": "Blog not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Blogs have been found');
      res.status(200).json(blogs);
    });
}; // Working

// Blogs: Update One
const blogsUpdateOne = (req, res) => {
  res.status(200).json({"message": "blogsUpdateOne: success"});
};

// Blogs: Delete One
const blogsDeleteOne = (req, res) => {
  const blogId = req.params.blogId;

  // Find specific record to update
  Blog
    .findById(blogId)
    .exec((err, blog) => {
      // Test for no results and error
      if (!blog) {
        return res.status(404).json({"message": "Blog not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change active status and save
      blog.active = _isActive(req.body.active);
      blog
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log('Blot active status saved');
            res.status(200).json(results);
          }
        });
    });
}; // Working

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
