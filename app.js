const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { JWT_SECRET } = require("./config");
const isJWT = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

/*
app.use((req, res, next) => {
  req.user = { _id: "5f8d04b3b54764421b7160cf" };
  next();
});
*/

app.use(express.json());
app.use("/", indexRouter);
app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
