const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const ProjectSchema = new Schema({
  name: {
    type: String
  },

  description: {
    type: String
  },

  pics: [{
    type: String
  }]
});

ProjectSchema.methods.toJSON = function () {
  let project = this;
  return _.pick(project, ['name', 'description', 'pics']);
};

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
