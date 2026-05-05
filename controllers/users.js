import isJWT from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";

const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/error");

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = isJWT.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ message: "Login successful", token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(CONFLICT).send({ message: "User already exists" });
      }
      if (err.name === "UnauthorizedError") {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Invalid credentials" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (user) {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            console.error(err);
            return res
              .status(INTERNAL_SERVER_ERROR)
              .send({ message: "An error occurred on the server" });
          }
          if (isMatch) {
            const token = isJWT.sign({ _id: user._id }, JWT_SECRET, {
              expiresIn: "7d",
            });
            res.status(200).send({ message: "Login successful", token });
          } else {
            res.status(UNAUTHORIZED).send({ message: "Invalid credentials" });
          }
        });
      } else {
        res.status(NOT_FOUND).send({ message: "User not found" });
      }
    });
};

const token = isJWT.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

/*
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};
*/

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(CONFLICT).send({ message: "User already exists" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

/*
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Document not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};
*/

module.exports = { getUsers, createUser, getUser, login };
