// se_project_express/errors/NotFoundError.js
const HttpError = require("./HttpError");

class NotFoundError extends HttpError {
  constructor(message = "Not found") {
    super(message, 404);
  }
}

module.exports = NotFoundError;