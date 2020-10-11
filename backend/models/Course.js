const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Course = new Schema({
   title: {
      type: String
   },
   description: {
      type: String
   },
   pieces: {
      type: String
   },
   sharingDate: {
      type: String
   }
}, {
   collection: 'Courses'
})

module.exports = mongoose.model('Course', Course);
