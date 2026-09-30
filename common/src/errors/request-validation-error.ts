import { ValidationError } from "express-validator";
import { CustomError, SerializedError } from "./custom-error";

export class RequestValidationError extends CustomError {

  public statusCode = 400;

  constructor(private errors: ValidationError[]){
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): SerializedError[]{
    return this.errors
      .filter(e => e.type === 'field')
      .map(e => ({ message: e.msg, field: e.path }));
  }
}