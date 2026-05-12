const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { NOT_FOUND } = require("../utils/error");
const { createUser, login } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", itemRoutes);
router.use("/users", userRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
