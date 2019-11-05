const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates a quiz called options in the Quiz database
 */
const quizSchema = new Schema({
  authorName: String,
  quizType: String,
  shortDesc: String,
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Quiz', quizSchema);