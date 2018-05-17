const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
  heading: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  testimonialGiverName: {
    type: String,
    required: true
  },

  testimonialGiverDesignation: {
    type: String,
    maxlength: 25,
    required: true
  },

  testimonialGiverLocation: {
    type: String,
    maxlength: 25,
    default: ''
  }
}, {
  usePushEach: true
});

TestimonialSchema.methods.toJSON = function () {
  const teamMember = this;
  return _.pick(teamMember, [
    '_id', 'heading', 'message',
    'testimonialGiverName', 'testimonialGiverDesignation', 'testimonialGiverLocation'
  ]);
};

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
module.exports = Testimonial;
