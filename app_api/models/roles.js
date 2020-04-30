const mongoose = require('mongoose');

// Role Schema
const roleSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      'default': true
    }
});
// Compiling a model from a schema
mongoose.model('Role', roleSchema, 'Roles');
