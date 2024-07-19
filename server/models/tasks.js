const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const TodoseModel = mongoose.model('todos', TodosSchema);

module.exports = TodoseModel;