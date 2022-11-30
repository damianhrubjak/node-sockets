import { Socket } from "socket.io-client";
import create from "zustand";

interface AppStoreType {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

const useSocketStore = create<AppStoreType>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket: socket }),
}));

export default useSocketStore;
