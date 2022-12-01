import { useCallback, useEffect } from "react";

import { isEmpty, isNull } from "lodash-es";
import { useNavigate } from "react-router-dom";

import ChatMessages from "@/components/ChatMessages";
import ChatUsers from "@/components/ChatUsers";
import useAppStore from "@/services/store/useAppStore";
import useSocketStore from "@/services/store/useSocketStore";
import { Message } from "@/types";

function Chat() {
  const { username, setUsers, addMessage } = useAppStore((state) => ({
    username: state.username,
    setUsers: state.setUsers,
    addMessage: state.addMessage,
  }));

  const socket = useSocketStore((state) => state.socket);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(username) || isNull(username)) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket?.on("message-response", (message: Message) => {
      addMessage(message);
    });
    socket?.on("users-response", (users) => setUsers(users));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const sendMessage = useCallback(
    (message: string) => {
      socket?.emit("message", { message, username });
    },
    [socket, username]
  );

  return (
    <div>
      {socket?.connected && (
        <div className="flex gap-4">
          <ChatMessages onSubmit={sendMessage} />

          <ChatUsers userSocketId={socket?.id} />
        </div>
      )}
    </div>
  );
}

export default Chat;
