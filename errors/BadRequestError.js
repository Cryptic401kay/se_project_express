// se_project_express/errors/BadRequestError.js
const HttpError = require("./HttpError");

class BadRequestError extends HttpError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

module.exports = BadRequestError;
