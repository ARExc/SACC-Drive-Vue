import {useEffect, useState} from "react";
import {getFileList} from "@/api/getFileList.ts";
import {FileListItem} from "@/types";
import style from './styles/Disk.module.scss';

const Disk = () => {
  const [items, setItems] = useState<FileListItem[]>([])

  useEffect(() => {

    getFileList({}).then(res => {
      console.log(res.data.data.records)
      setItems(res.data.data.records)
      // eslint-disable-next-line no-debugger
      // debugger;

    }).catch(err => {
      console.log(err)

    })

  }, []);

  const createIcon = (item: FileListItem) => {
    if (item.folderType === 1) {
      return '/src/assets/icon/folder.png'
    } else {
      return '/src/assets/icon/file.png'
    }
  }

  return (
    <div className={style.folder}>
      {items.map(item => {
        return (
          <div className={style.folderItem}>
            <img src={createIcon(item)} alt="File Icon"/>
            <div key={item.id} className={style.fileName}>{item.fileName}</div>
          </div>
        )
      })}
    </div>
  );
}
export default Disk;
