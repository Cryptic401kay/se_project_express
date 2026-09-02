const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");

const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/error");

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === "UnauthorizedError") {
        next(new UnauthorizedError("Invalid credentials"));
        return;
      }
      next(err);
    });
};

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(new ConflictError("User already exists"));
      return;
    }

    const user = await User.create({ name, avatar, email, password });
    const userObject = user.toObject();
    delete userObject.password;
    res.status(201).send(userObject);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError("User already exists"));
      return;
    }

    if (err.name === "ValidationError") {
      next(new BadRequestError("Invalid data"));
      return;
    }

    next(err);
  }
};

const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
        return;
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
        return;
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
        return;
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
