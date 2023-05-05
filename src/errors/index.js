export class BadRequest {
  message;
  statusCode = 400;
  constructor(message) {
    this.message = JSON.stringify(message);
  }
}

export class Conflict {
  message;
  statusCode = 409;
  constructor(message) {
    this.message = JSON.stringify(message);
  }
}

export class NotFound {
  message;
  statusCode = 404;
  constructor(message) {
    this.message = JSON.stringify(message);
  }
}
