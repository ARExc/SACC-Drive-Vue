import {ApiResponse} from "@/types";
import request from "@/util/request.ts";

type downloadRes = {
  buffer: ArrayBuffer;
}

export const download = async (code: number, chunkNumber: number) => {
  const res = await request.get<ApiResponse<downloadRes>>(`/api/priv/file/download/${code}/${chunkNumber}`);
  return res.data.data.buffer;
}
