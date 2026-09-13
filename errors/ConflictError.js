// se_project_express/errors/ConflictError.js
const HttpError = require("./HttpError");

class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

module.exports = ConflictError;
