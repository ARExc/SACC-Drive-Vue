import request from "@/util/request.ts";

export const check = (md5: string, code: string) =>
  request.post('/api/priv/file/check', {
  md5,
  code
})
