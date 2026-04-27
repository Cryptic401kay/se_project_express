const router = require("express").Router();
const userRoute = require("./users");
const clothingItemsRoute = require("./clothingItems");
const { NOT_FOUND } = require("../utils/error");

router.use("/items", clothingItemsRoute);
router.use("/users", userRoute);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ error: "Resource not found" });
});

module.exports = router;
