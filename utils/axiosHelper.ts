import axios, { AxiosResponse } from "axios";
import { baseUrl } from "./globalHelper";

const billowAxios = axios.create({ baseURL: baseUrl });

export const billowPost = async <Request, Response>(
  url: string,
  data: Request
) => {
  return billowAxios.post<Response, AxiosResponse<Response>, Request>(
    url,
    data
  );
};

export const billowGet = async <Response>(url: string) => {
  return billowAxios.get<Response, AxiosResponse<Response>>(url);
};
