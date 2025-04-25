class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new CustomError(400, message);
  }

  static unauthorized(message) {
    return new CustomError(204, message);
  }

  static forbidden(message) {
    return new CustomError(204, message);
  }

  static notFound(message) {
    return new CustomError(404, message);
  }

  static loginError(message) {
    return new CustomError(200, message);
  }

  static internalServer(message = "Internal Server Error") {
    return new CustomError(500, message);
  }
}

module.exports = CustomError;
