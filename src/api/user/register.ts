import {ApiResponse, RegisterData} from "@/types";
import request from "@/util/request.ts";

export const register = (data: RegisterData) => {
  return request.post<ApiResponse>('/api/register', {
    data: data
  })
}
