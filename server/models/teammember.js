const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const TeamMemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  designation: {
    type: String,
    maxlength: 25,
    default: ''
  },

  type: {
    type: String,
    enum: ['volunteer', 'trustee', 'ambassador', 'technical'],
    required: true
  },

  info: {
    type: String,
    required: true
  },

  pic: {
    type: String,
    required: true
  }
}, {
  usePushEach: true
});

TeamMemberSchema.methods.toJSON = function () {
  const teamMember = this;
  return _.pick(teamMember, ['_id', 'name', 'designation', 'type', 'info', 'pic']);
};

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
module.exports = TeamMember;
