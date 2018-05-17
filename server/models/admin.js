const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
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
}, {
  usePushEach: true
});

AdminSchema.pre('save', function (next) {
  const admin = this;
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
  const admin = this;
  const tokenString = jwt.sign({_id: admin._id.toHexString()}, JWT_SECRET_KEY);
  admin.tokens.push(tokenString);

  return admin.save().then(() => tokenString);
};

AdminSchema.statics.findByToken = function (tokenString) {
  const Admin = this;
  let decoded;

  try {
    decoded = jwt.verify(tokenString, JWT_SECRET_KEY);
  } catch (e) {
    return Promise.reject(Error('Invalid Token'));
  }

  const {_id} = decoded;

  return Admin.findOne({
    _id,
    tokens: tokenString
  });
};

AdminSchema.statics.findByCreds = function (username, password) {
  const Admin = this;
  return Admin.findOne({username})
    .then(admin => {
      if (!admin) {
        return Promise.reject(Error('No such Admin'));
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, admin.password, (err, res) => {
          if (res) {
            resolve(admin);
          } else {
            reject(Error('Incorrect Password'));
          }
        });
      });
    });
};


const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
