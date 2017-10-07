const mongoose = require('mongoose');
const _ = require('lodash');
const PicSchema = require('./subschema/pic');
const CaptionSchema = require('./subschema/caption');

const Schema = mongoose.Schema;

const HomePageSchema = new Schema({
  centerPics: {
    type: [PicSchema],
    required: true
  },

  brandLogoUrl: {
    type: String,
    required: true
  },

  captions: {
    type: [CaptionSchema],
    required: true
  }
});

HomePageSchema.methods.toJSON = function () {
  const homePage = this;
  return _.pick(homePage, ['centerPics', 'brandLogoUrl', 'captions']);
};

const HomePage = mongoose.model('HomePage', HomePageSchema);
module.exports = HomePage;
