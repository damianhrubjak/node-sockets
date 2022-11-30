import { ReactNode, useEffect } from "react";

import { isEmpty } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { connect } from "socket.io-client";

import useAppStore from "../store/useAppStore";
import useSocketStore from "../store/useSocketStore";

type Props = {
  children: ReactNode;
};

function SocketProvider({ children }: Props) {
  const username = useAppStore((state) => state.username);
  const setSocket = useSocketStore((state) => state.setSocket);

  const navigate = useNavigate();

  useEffect(() => {
    const socket = connect(import.meta.env.VITE_BACKEND_URL);

    socket.on("connect", () => {
      //set socket to store
      setSocket(socket);

      if (isEmpty(username)) {
        // if no username is specified, go to home
        navigate("/");
        return;
      }

      socket?.emit("new-user", { username: username, socketId: socket.id });
      navigate("chat");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export default SocketProvider;
