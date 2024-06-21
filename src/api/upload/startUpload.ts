import request from "@/util/request.ts";
import {startUploadDto} from "@/types";

export const startUpload = (data: startUploadDto) =>
  request.post('/api/priv/file/startUpload', data)

