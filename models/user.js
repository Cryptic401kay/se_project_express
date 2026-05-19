const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    return next();
  });
  return null;
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const err = new Error("Incorrect email or password");
        err.name = "UnauthorizedError";
        return Promise.reject(err);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Incorrect email or password");
          err.name = "UnauthorizedError";
          return Promise.reject(err);
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
