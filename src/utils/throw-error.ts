interface ErrorDetails {
  msg: string;
  statusCode: number;
}

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const ThrowError = ({ msg, statusCode }: ErrorDetails) => {
  throw new CustomError(msg, statusCode);
};

export default ThrowError;
