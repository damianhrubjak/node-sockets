import create from "zustand";
import { persist } from "zustand/middleware";

import { Message, User } from "@/types";

interface AppStoreType {
  username: string | null;
  setUsername: (username: string) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

const useAppStore = create<AppStoreType>()(
  persist(
    (set) => ({
      username: null,
      setUsername: (username: string) => set(() => ({ username: username })),
      messages: [],
      addMessage: (message: Message) =>
        set(({ messages }) => ({ messages: [...messages, message] })),
      users: [],
      setUsers: (users: User[]) => set(() => ({ users: users })),
    }),
    {
      name: "app-storage",
    }
  )
);

export default useAppStore;
