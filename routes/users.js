const router = require("express").Router();
const {
  login,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateCurrentUser);

module.exports = router;
