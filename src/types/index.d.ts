export type ApiResponse<T = object> = {
  code: number;
  errMessage: string;
  data: T;
}
export type LoginData = {
  username: string;
  password: string;
}
export type LoginRes = {
  token: string;
}
export type FileListData = {
  category?: number;//0: 全部 1：视频 2：音频 3：文档 4：图片 5：其他
  fileName?: string;
  filePid?: string;
  pageNo?: number;
  pageSize?: number;
}
export type FileListItem = {
  id: number;
  filePid: string;
  fileName: string;
  fileSize: number;
  fileCover: number;
  fileUrl: string;
  lastUpdateTime: string;
  folderType: number;
  fileCategory: number;
  status: number;
}
export type FileListRes = {
  total: number;
  records: FileListItem[];
}
