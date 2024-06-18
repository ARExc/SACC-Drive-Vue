import {FileListData} from "@/types";
import {create} from "zustand";

interface fileState {
  file: FileListData | null,
  setFile: (file: FileListData) => void
}

const useFileStore = create<fileState>(
  (set) => ({
  file: null,
  setFile: (file: FileListData) => set({file})
}))

export default useFileStore;
