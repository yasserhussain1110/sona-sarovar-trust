const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const HomePageSchema = new Schema({
  centerPics: [{
    type: String
  }],

  captions: [{
    type: String,
    minlength: 40,
    maxlength: 80,
    trim: true
  }],

  mainTextPara1: {
    type: String
  },

  mainTextPara2: {
    type: String
  }
});

HomePageSchema.methods.toJSON = function () {
  let homePage = this;
  let {centerPics, captions, mainTextPara1, mainTextPara2} = homePage;
  return {centerPics, captions, mainTexts: [mainTextPara1, mainTextPara2]};
};

const HomePage = mongoose.model('HomePage', HomePageSchema);
module.exports = HomePage;
