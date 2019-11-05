const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates a collection called options in the Quiz database
 */
const optionSchema = new Schema({
  questionId: String,
  option: String,
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Option', optionSchema);