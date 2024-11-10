export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly success: boolean;
  public message: string;
  public type?: string;
  public readonly errors?: any[];

  constructor(
    statusCode: number,
    message: string,
    type?: string,
    errors?: any[],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.type = type;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // This is necessary for instanceof to work correctly
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
