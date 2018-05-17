const mongoose = require('mongoose');
const _ = require('lodash');
const PicSchema = require('./subschema/pic');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: {
    type: String,
    require: true
  },

  description: {
    type: String,
    required: true
  },

  pics: {
    type: [PicSchema],
    required: true
  }
}, {
  usePushEach: true
});

ActivitySchema.methods.toJSON = function () {
  const project = this;
  return _.pick(project, ['_id', 'name', 'description', 'pics']);
};

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
