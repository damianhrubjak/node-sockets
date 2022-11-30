import { connect, Socket } from "socket.io-client";
import create from "zustand";

interface AppStoreType {
  socket: Socket;
  username: string | null;
}

const useAppStore = create<AppStoreType>(() => ({
  socket: connect(import.meta.env.VITE_BACKEND_URL),
  username: null,
}));

export default useAppStore;
