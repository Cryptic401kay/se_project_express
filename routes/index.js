const router = require("express").Router();
const userRoute = require("./users");
const clothingItemsRoute = require("./clothingItems");
const { NOT_FOUND } = require("../utils/error");
const { createUser, login } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", clothingItemsRoute);
router.use("/users", userRoute);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
