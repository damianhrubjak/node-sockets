import create from "zustand";
import { persist } from "zustand/middleware";

interface AppStoreType {
  username: string | null;
  setUsername: (username: string) => void;
}

const useAppStore = create<AppStoreType>()(
  persist(
    (set) => ({
      username: null,
      setUsername: (username: string) => set(() => ({ username: username })),
    }),
    {
      name: "app-storage",
    }
  )
);

export default useAppStore;
