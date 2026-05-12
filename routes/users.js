const router = require("express").Router();
const {
  getCurrentUser,
  updateCurrentUser,
  login,
  createUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
