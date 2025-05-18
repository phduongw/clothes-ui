export interface BaseResponse<T> {
  status: {
      code: number;
      message: string;
      timestamp: string;
      errorCode?: string
  };
  data?: T;
}