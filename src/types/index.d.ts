export interface ApiResponse<T = object> {
  code: number;
  errMessage: string;
  data: T;
}

export * from './login';

export * from './file';

export * from './upload';
