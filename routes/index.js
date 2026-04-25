const router = require("express").Router();
const userRoute = require("./users");
const clothingItemsRoute = require("./clothingItems");

router.use("/items", clothingItemsRoute);
router.use("/users", userRoute);

router.use((req, res) => {
  res.status(500).send({ error: "Router not found" });
});

module.exports = router;
