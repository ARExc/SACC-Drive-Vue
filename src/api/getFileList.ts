import request from "@/util/request.ts";
import {FileListData, FileListRes} from "@/types";
import {ApiResponse} from "@/types";

export const getFileList = (data: FileListData) =>
  request.get<ApiResponse<FileListRes>>('/api/getFileList', {
      params: data
    }
  )
