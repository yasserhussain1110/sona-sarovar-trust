const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const PicSchema = require('./subschema/pic');

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
});

// ActivitySchema.methods.toJSON = function () {
//   let project = this;
//   return _.pick(project, ['name', 'description', 'pics']);
// };

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
