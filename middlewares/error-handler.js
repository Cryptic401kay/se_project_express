const { HttpError } = require("../errors");

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: "An error occurred on the server" });
};
