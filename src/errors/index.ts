abstract class HttpError extends Error {
  public status!: number;

  public code!: string;
}

export enum ErrorCodes {
  BAD_REQUEST = 'bad_request',
  NOT_FOUND = 'not_found',
  UNAUTHORIZED = 'unauthorized',
  GENERIC = 'error',
  MISSING_PARAMETERS = 'missing_parameters',
}

export class BadRequest extends HttpError {
  constructor(message = 'Bad Request', code = ErrorCodes.BAD_REQUEST) {
    super(message);
    this.status = 400;
    this.code = code;
  }
}

export class Unauthorized extends HttpError {
  constructor(message = 'Unauthorized', code = ErrorCodes.UNAUTHORIZED) {
    super(message);
    this.status = 401;
    this.code = code;
  }
}
