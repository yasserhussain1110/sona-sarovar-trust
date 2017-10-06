const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const AboutUsSchema = new Schema({
  vision: {
    type: String,
    required: true,
    minlength: 400,
    maxlength: 1000,
    trim: true
  },

  mission: {
    type: String,
    required: true,
    minlength: 400,
    maxlength: 1000,
    trim: true
  },

  history: {
    type: String,
    required: true,
    minlength: 400,
    maxlength: 1000,
    trim: true
  }
});

AboutUsSchema.methods.toJSON = function () {
  const project = this;
  return _.pick(project, ['vision', 'mission', 'history']);
};

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);
module.exports = AboutUs;
