const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CaptionSchema = new Schema({
  text: {
    type: String,
    minlength: 40,
    maxlength: 100,
    trim: true,
    required: true
  }
}, {
  usePushEach: true
});

module.exports = CaptionSchema;
