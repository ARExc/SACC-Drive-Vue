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

export interface FileListData {
  category: number;//0: 全部 1：视频 2：音频 3：文档 4：图片 5：其他
  fileName?: string;//?表示该属性是可选的
  filePid: string;
  pageNo: number;
  pageSize: number;
}

export interface FileListItem {
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

export interface FileListRes {
  total: number;
  records: FileListItem[];
}
