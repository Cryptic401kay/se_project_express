const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/users");
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");

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

app.use(express.json());
app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/", indexRouter);
app.use(auth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
