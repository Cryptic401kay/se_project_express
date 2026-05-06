const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");
const { login } = require("../controllers/users");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
