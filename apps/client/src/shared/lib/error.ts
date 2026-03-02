export type ApiErrorParams = {
  message: string;
  status?: string;
  code?: string;
};

export class ApiError extends Error {
  status?: string;
  code?: string;

  constructor({ message, status, code }: ApiErrorParams) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}
