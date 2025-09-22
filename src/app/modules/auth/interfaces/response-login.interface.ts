export interface IResponseLogin<T = any> {
  success?: boolean;
  message?: string;
  statusCode?: number;
  result?: T;
}
