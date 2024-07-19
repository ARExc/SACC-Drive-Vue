import style from './styles/ContextMenu.module.scss';
import React from "react";
import {DeleteOutlined, DownloadOutlined, EditOutlined, SwapOutlined} from "@ant-design/icons";
import {FileListItem} from "@/types";
import {startDownload} from "@/api/download/startDownload.ts";
import {download} from "@/api/download/download.ts";
import {fileTypeFromBuffer} from 'file-type';

interface ContextMenuProps {
  x: number;
  y: number;
  show: boolean;
  currentItem: FileListItem;
}

//检测文件类型
const detectFileType = async (buffer: Uint8Array) => {
  const result = await fileTypeFromBuffer(buffer);
  return result ? result.mime : 'application/octet-stream';  // 如果无法确定类型，返回默认值
};

const ContextMenu: React.FC<ContextMenuProps> = ({x, y, show, currentItem}) => {
  if (!show) return null;

  const handleDownload = async () => {
    console.log('下载' + currentItem.id)
    const downloadInfo = await startDownload(currentItem.id)
    console.log(downloadInfo);
    const chunkTotal = downloadInfo.chunkTotal;
    let buffer = new Uint8Array([]);
    for (let i = 0; i < chunkTotal; i++) {
      const chunk = new Uint8Array(await download(i, i));//下载第 i 个分块，并转换为 Uint8Array
      const newBuffer = new Uint8Array(buffer.length + chunk.length);//创建一个新的 Uint8Array，用于存放当前的 buffer 和新的分块，大小是原来的 buffer 大小加上新的分块大小
      newBuffer.set(buffer, 0);//将当前 buffer 的内容复制到 newBuffer 的起始位置
      newBuffer.set(chunk, buffer.length);//将下载的分块复制到 newBuffer 的后续位置
      buffer = newBuffer;//更新 buffer，使其包含所有已下载的分块
    }
    const mimeType = await detectFileType(buffer);
    console.log(mimeType);
    const blob = new Blob([buffer], {type: mimeType});//创建一个 Blob 对象，包含所有下载的分块，并设置 MIME 类型
    const file = new File([blob], downloadInfo.fileName, {type: mimeType});//通过Blob创建一个 File 对象
    const url = window.URL.createObjectURL(file);//创建一个指向 Blob 数据的 URL 对象
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadInfo.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }


  return (
      <div className={style.contextMenu} style={{top: y, left: x}}>
        <ul>
          <li onClick={handleDownload}>
            <DownloadOutlined/>
            <span>下载</span>
          </li>
          <li>
            <SwapOutlined/>
            <span>移动</span>
          </li>
          <li>
            <EditOutlined/>
            <span>重命名</span>
          </li>
          <li>
            <DeleteOutlined/>
            <span>删除</span>
          </li>
        </ul>
      </div>
  );
}
export default ContextMenu;
