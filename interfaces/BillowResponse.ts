export interface BillowResponse<T> {
  data: T;
  message: string;
  isSuccess: boolean;
}
export interface BillowSimpleResponse {
  message: string;
  isSuccess: boolean;
}
