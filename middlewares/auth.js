const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const token = authorization.replace("Bearer ", "");

payload = jwt.verify(token, JWT_SECRET);

req.user = payload;
next();

module.exports = token;
