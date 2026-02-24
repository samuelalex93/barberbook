export class NotFoundError extends Error {
  statusCode: number;
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class InvalidPasswordError extends Error {
  statusCode: number;
  constructor(message = "Invalid password") {
    super(message);
    this.name = "InvalidPasswordError";
    this.statusCode = 401;
  }
}

export class ForbiddenError extends Error {
  statusCode: number;
  constructor(message = "Access forbidden") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}
