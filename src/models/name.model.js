const Mongoose = require('mongoose');

const NameSchema = new Mongoose.Schema({
  name: String,
});

const Name = Mongoose.model('Name', NameSchema);

module.exports = Name;
