import {create} from "zustand";
import { persist } from "zustand/middleware";
import {FolderDataInBreadcrumb} from "@/types";


interface BreadcrumbInfo {
  breadcrumb: FolderDataInBreadcrumb[];
  addBreadcrumb: (breadcrumb: FolderDataInBreadcrumb) => void;
  removeBreadcrumb: (index: number) => void;
  clearBreadcrumb: () => void;
}

const useBreadcrumbStore = create<BreadcrumbInfo>()(//此处必须使用柯里化，否则无法推断类型
  persist(
    (set) => ({
      breadcrumb: [],
      addBreadcrumb: (newCrumb: FolderDataInBreadcrumb) => set((state) => ({
        breadcrumb: [...state.breadcrumb, newCrumb],
      })),
      removeBreadcrumb: (index: number) => set((state) => ({
        breadcrumb: state.breadcrumb.slice(0, index),
      })),
      clearBreadcrumb: () => set({ breadcrumb: [] }),
    }),
    {
      name: "breadcrumb-storage", // key to use in localStorage
      // Optionally, you can define a custom getStorage function
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useBreadcrumbStore;
