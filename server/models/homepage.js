const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const PicSchema = require('./pic');

const HomePageSchema = new Schema({
  centerPics: {
    type: [PicSchema],
    required: true
  },

  // TODO:- May need to move the following array object to its own caption schema
  captions: [{
    text: {
      type: String,
      minlength: 40,
      maxlength: 80,
      trim: true,
      required: true
    }
  }],

  mainTextPara1: {
    type: String,
    required: true
  },

  mainTextPara2: {
    type: String,
    required: true
  }
});

HomePageSchema.methods.toJSON = function () {
  let homePage = this;
  return _.pick(homePage, ["centerPics", "captions", "mainTextPara1", "mainTextPara2"]);
};

const HomePage = mongoose.model('HomePage', HomePageSchema);
module.exports = HomePage;
