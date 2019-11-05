const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates a question called options in the Quiz database
 */
const questionSchema = new Schema({
  quizId: String,
  time: Number,
  question: String,
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Question', questionSchema);