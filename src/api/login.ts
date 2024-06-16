import request from "@/util/request.ts";
import {LoginData, LoginRes, ApiResponse} from "@/types";

export const login = (data: LoginData) =>
  request.post<ApiResponse<LoginRes>>('/login', {
      data: data
    }
  )
