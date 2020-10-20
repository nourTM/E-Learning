const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let fileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  piece: {
    type: Array
  },
}, {
  collection: 'files'
})

module.exports = mongoose.model('File', fileSchema)
