const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const ActivitySchema = new Schema({
  name: {
    type: String
  },

  description: {
    type: String
  },

  pics: [{
    url: {
      type: String,
      required: true
    }
  }]
});

// ActivitySchema.methods.toJSON = function () {
//   let project = this;
//   return _.pick(project, ['name', 'description', 'pics']);
// };

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
