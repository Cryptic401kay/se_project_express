const { UNAUTHORIZED } = require("../utils/error");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Authorization token missing" });
  }

  isJWT.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res
        .status(UNAUTHORIZED)
        .send({ message: "Invalid authorization token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
