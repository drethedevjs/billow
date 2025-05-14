import axios, { AxiosResponse } from "axios";

export const billowPost = async <Request, Response>(
  url: string,
  data: Request
) => {
  return axios.post<Response, AxiosResponse<Response>, Request>(url, data);
};
