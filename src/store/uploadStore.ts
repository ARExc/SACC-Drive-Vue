import {create} from "zustand";
import {UploadFile} from "@/types";


interface UploadState {
  uploadFiles: UploadFile[];
  fileCount: number;
  addUploadFile: (file: UploadFile) => void;
  updateProgress: (id: string, progress: number) => void;
  markAsCompleted: (id: string) => void;
  removeFile: (id: string) => void;
  addFileCount: (count: number) => void;
  subtractFileCount: () => void;
  changeState: (id: string, status: UploadFile['status']) => void;
  getStateById: (id: string) => UploadFile['status'];
  startNextFile: () => void;
}


export const useUploadStore = create<UploadState>()((set, get) => ({
  //参数中的set用于在create函数中修改状态，get用于在create函数中获取自己的状态
  uploadFiles: [],
  fileCount: 0,
  addUploadFile: (file) => set(
      (state) => ({
        uploadFiles: [...state.uploadFiles, file]
      })),
  updateProgress: (id, progress) =>
      set((state) => ({
        uploadFiles: state.uploadFiles.map((file) =>
            file.id === id ? {...file, progress} : file
        ),
      })),
  markAsCompleted: (id) =>
      set((state) => ({
        uploadFiles: state.uploadFiles.map((file) =>
            file.id === id ? {...file, status: 'completed'} : file
        ),
      })),
  removeFile: (id) =>
      set((state) => ({
        uploadFiles: state.uploadFiles.filter((file) => file.id !== id),
      })),
  addFileCount: (count) => set(state => ({
    fileCount: state.fileCount + count
  })),
  subtractFileCount: () => set(state => ({
    fileCount: state.fileCount - 1
  })),
  changeState: (id, status) =>
      set((state) => ({
        uploadFiles: state.uploadFiles.map((file) =>
            file.id === id ? {...file, status} : file//解构file对象，修改其中的status属性
        )
      })),
  getStateById: (id) => {
    const {uploadFiles} = get();
    const file = uploadFiles.find(file => file.id === id);
    return file ? file.status : 'error';
  },
  startNextFile: () => {
    const {uploadFiles, changeState} = get();
    const nextFile = uploadFiles.find(file => file.status === 'waiting');//find方法返回的是第一个满足条件的元素
    if (nextFile) {
      changeState(nextFile.id, 'uploading');
      // 这里可以调用实际的上传函数，传递 nextFile.id 和其他必要信息
    }
  }
}));
export default useUploadStore;
