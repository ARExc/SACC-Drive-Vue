export interface startUploadDto {
  /**
   * 分片总数
   */
  chunkTotal: number;
  /**
   * 原文件名
   */
  fileName: string;
  /**
   * 文件父id
   */
  filePid?: string;
  /**
   * 文件大小
   */
  fileSize: number;
}
