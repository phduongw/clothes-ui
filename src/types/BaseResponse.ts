export interface BaseResponse<T> {
  status: {
      code: number;
      message: string;
      timestamp: string;
  };
  data?: T;
}