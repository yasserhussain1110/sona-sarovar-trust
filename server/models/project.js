const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');
const PicSchema = require('./subschema/pic');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
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

ProjectSchema.methods.toJSON = function () {
  const project = this;
  return _.pick(project, ['_id', 'name', 'description', 'pics']);
};

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
