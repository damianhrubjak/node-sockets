import { User } from "@/types";

type Props = {
  users: User[];
  userSocketId: string;
};

function ChatUsers({ users, userSocketId }: Props) {
  return (
    <div className="fixed right-4 top-4 bottom-4 h-[100vh-2rem] w-80 rounded-xl border-2 border-purple-500 p-4">
      <h1 className="mb-8 text-2xl">Používatelia</h1>
      {users.map(({ username, socketId }) => (
        <p
          className={` font-mono text-xl font-bold ${
            socketId === userSocketId ? "text-purple-300" : ""
          }`}
          key={socketId}
        >
          {username}
          {socketId === socketId && (
            <span className="ml-2 text-sm text-slate-500">
              Tento používateľ
            </span>
          )}
        </p>
      ))}
    </div>
  );
}

export default ChatUsers;
