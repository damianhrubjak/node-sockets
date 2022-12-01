import { useMemo } from "react";

import useAppStore from "@/services/store/useAppStore";
import { Message } from "@/types";

type Props = {
  message: Message;
};

function MessageItem({ message: { message, date, username } }: Props) {
  const userUsername = useAppStore((s) => s.username);
  const isUsersMessage = useMemo(
    () => userUsername === username,
    [userUsername, username]
  );

  return (
    <div
      className={`mt-4 flex w-full flex-col first:mt-0 ${
        isUsersMessage ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <p className="text-xs text-slate-500">{username}</p>
      <p
        className={`my-1 max-w-prose rounded-md  ${
          isUsersMessage ? "bg-purple-700" : "bg-slate-700"
        } py-2 px-4`}
      >
        {message}
      </p>
      <p className="text-xs text-slate-500">
        {new Date(date).toLocaleString()}
      </p>
    </div>
  );
}

export default MessageItem;
