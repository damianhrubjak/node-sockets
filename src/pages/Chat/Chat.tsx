import { useEffect, useState } from "react";

import { isEmpty, isNull } from "lodash-es";
import { useNavigate } from "react-router-dom";

import ChatUsers from "@/components/ChatUsers";
import useAppStore from "@/services/store/useAppStore";
import useSocketStore from "@/services/store/useSocketStore";
import { User } from "@/types";

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const socket = useSocketStore((state) => state.socket);
  const username = useAppStore((state) => state.username);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(username) || isNull(username)) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket?.on("message-response", (message) =>
      setMessages([...messages, message])
    );
    socket?.on("users-response", (users) => setUsers(users));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div>
      {socket?.connected && (
        <ChatUsers userSocketId={socket?.id} users={users} />
      )}
    </div>
  );
}

export default Chat;
