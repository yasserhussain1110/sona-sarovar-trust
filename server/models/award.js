const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AwardSchema = new Schema({
  url: {
    type: String,
    unique: true,
    trim: true,
    required: true
  }
}, {
  usePushEach: true
});


const Award = mongoose.model('Award', AwardSchema);
module.exports = Award;
