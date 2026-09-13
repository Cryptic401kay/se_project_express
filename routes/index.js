const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../errors");
const {
  validateAuthBody,
  validateUserBody,
} = require("../middlewares/validation");

router.post("/signin", validateAuthBody, login);
router.post("/signup", validateUserBody, createUser);
router.use("/items", itemRoutes);
router.use("/users", userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
