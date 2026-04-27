const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use((req, res, next) => {
  req.user = { _id: "your-test-user-id" };
  next();
});

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
