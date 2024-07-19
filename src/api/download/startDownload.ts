import request from "@/util/request.ts";
import {ApiResponse, startDownloadRes} from "@/types";

export const startDownload = (id: string) => {
  return request.get<ApiResponse<startDownloadRes>>(`/api/priv/file/startDownload/${id}`)
      .then(res => res.data.data)
}
