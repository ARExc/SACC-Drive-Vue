import {create} from "zustand";

interface fileInfo {
  fileName: string,
  fileSize: number,
}


interface fileModule {
  // file: FileListData | null,
  // setFile: (file: FileListData) => void
  fileInfo: fileInfo,
  filePid: string,
  setFileInfo: (fileInfo: fileInfo) => void,
  setFilePid: (filePid: string) => void
}

const useFileStore = create<fileModule>(
  set => ({
    // file: null,
    // setFile: (file: FileListData) => set({file})
    fileInfo: {
      fileName: '',
      fileSize: 0
    },
    filePid: '',
    setFileInfo: (fileInfo: fileInfo) => set({fileInfo}),
    setFilePid: (filePid: string) => set({filePid})

  }))

export default useFileStore;
