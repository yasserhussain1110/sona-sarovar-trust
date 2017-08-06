const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const TeamMemberSchema = new Schema({
  name: {
    type: String,
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
});

TeamMemberSchema.methods.toJSON = function () {
  let teamMember = this;
  return _.pick(teamMember, ['name', 'info', 'pic']);
};

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
module.exports = TeamMember;
