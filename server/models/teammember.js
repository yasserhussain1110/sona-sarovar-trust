const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const TeamMemberSchema = new Schema({
    name: {
      type: String
    },

    info: {
      type: String
    },

    pic: {
      type: String
    }
});

TeamMemberSchema.methods.toJSON = function () {
  let teamMember = this;
  return _.pick(teamMember, ['name', 'info', 'pics']);
};

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
module.exports = TeamMember;
