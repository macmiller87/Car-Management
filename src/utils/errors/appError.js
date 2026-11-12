export class AppError {
  message;
  statusCode;

  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }

  get message() {
    return this.message;
  }

  set message(message) {
    this.message = message;
  }

  get statusCode() {
    return this.statusCode;
  }

  set statusCode(statusCode) {
    this.statusCode = statusCode;
  }
  
}