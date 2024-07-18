import React, {useEffect, useState} from "react";
import {getFileList} from "@/api/getFileList.ts";
import {FileListItem} from "@/types";
import style from './styles/Disk.module.scss';
import useBreadcrumbStore from "@/store/breadcrumbStore.ts";
import ContextMenu from "@/components/ContextMenu.tsx";

const Disk = () => {
  const [items, setItems] = useState<FileListItem[]>([])
  const {breadcrumb, addBreadcrumb} = useBreadcrumbStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});

  useEffect(() => {
    getFileList({}).then(res => {
      setItems(res.data.data.records);
    }).catch(err => {
      console.log(err);
    });

  }, [breadcrumb]);

  const createIcon = (item: FileListItem) => {
    if (item.folderType === 1) {
      return '/src/assets/icon/folder.png'
    } else {
      return '/src/assets/icon/file.png'
    }
  }

  const previewFolder = (item: FileListItem) => {
    if (item.folderType === 1) {
      console.log('点击' + item.id)
      addBreadcrumb({
        folderName: item.fileName,
        id: item.filePid
      })
    }
  }
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({
      x: e.clientX,
      y: e.clientY
    });
    setMenuVisible(true);
  }

  // 点击其他地方关闭右键菜单
  window.addEventListener('click', () => {
    setMenuVisible(false);
  })

  return (
    <div className={style.folder}>
      {items.map(item => {
        return (
          <div className={style.folderItem} key={item.id} onClick={() => previewFolder(item)}
               onContextMenu={handleContextMenu}>
            <img src={createIcon(item)} alt="File Icon"/>
            <div
              className={style.fileName}>{item.fileName.length < 10 ? item.fileName : item.fileName.slice(0, 10) + "..."}
            </div>
          </div>
        )
      })}
      <ContextMenu
        x={menuPosition.x}
        y={menuPosition.y}
        show={menuVisible}
      ></ContextMenu>
    </div>
  );
}
export default Disk;
