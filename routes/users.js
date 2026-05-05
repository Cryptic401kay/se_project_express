const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

//router.post("/", createUser);
//router.get("/", getUsers);
//router.get("/:userId", getUser);
router.get("/users/me:req.user", getCurrentUser);

module.exports = router;
