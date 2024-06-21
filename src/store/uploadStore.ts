import {create} from "zustand";

interface UploadFile {
  id: string;
  fileName: string;
  fileSize: number;
  progress: number;
  status: 'uploading'
    | 'completed'
    | 'canceled'
    | 'paused'
    | 'waiting'
    | 'error';
}

interface UploadState {
  uploadFiles: UploadFile[];
  fileCount: number;
  addUploadFile: (file: UploadFile) => void;
  updateProgress: (id: string, progress: number) => void;
  markAsCompleted: (id: string) => void;
  removeFile: (id: string) => void;
  addFileCount: (count:number) => void;
  subtractFileCount: () => void;
  changeState: (id: string, status: UploadFile['status']) => void;
}

export const useUploadStore = create<UploadState>()((set) => ({
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
        file.id === id ? {...file, status} : file
      )
    })),
}));
export default useUploadStore;
