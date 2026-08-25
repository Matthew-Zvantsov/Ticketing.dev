import { CustomError, SerializedError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  
  public statusCode = 500;

  constructor(public message: string){
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): SerializedError[]{
    return [{ message: this.message }];
  }
}