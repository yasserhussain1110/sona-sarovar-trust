const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {JWT_SECRET_KEY} = process.env;

const AdminSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    minlength: 1
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  tokens: [{
    type: String
  }]
});

AdminSchema.pre('save', function (next) {
  let admin = this;
  if (!admin.isModified('password')) return next();

  bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(admin.password, salt);
    })
    .then(hash => {
      admin.password = hash;
      next();
    })
    .catch(e => {
      next(e);
    });
});

AdminSchema.methods.generateAuthToken = function () {
  let admin = this;
  let tokenString = jwt.sign({_id: admin._id.toHexString()}, JWT_SECRET_KEY);
  admin.tokens.push(tokenString);

  return admin.save().then(() => tokenString);
};

AdminSchema.statics.findByToken = function (tokenString) {
  let Admin = this;
  let decoded;

  try {
    decoded = jwt.verify(tokenString, JWT_SECRET_KEY);
  } catch (e) {
    return Promise.reject('Invalid Token');
  }

  let {_id} = decoded;

  return Admin.findOne({
    _id,
    tokens: tokenString
  });
};

AdminSchema.statics.findByCreds = function (username, password) {
  let Admin = this;
  return Admin.findOne({username})
    .then(admin => {
      if (!admin) {
        return Promise.reject('No such Admin');
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, admin.password, function (err, res) {
          if (res) {
            resolve(admin);
          } else {
            reject('Incorrect Password');
          }
        });
      });
    });
};


const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
