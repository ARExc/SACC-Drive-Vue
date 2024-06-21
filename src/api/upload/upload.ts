import request from "@/util/request.ts";

export const upload = (data: FormData) =>
  request.post('/api/priv/file/upload', data)
