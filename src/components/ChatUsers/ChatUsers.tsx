import useAppStore from "@/services/store/useAppStore";

type Props = {
  userSocketId: string;
};

function ChatUsers({ userSocketId }: Props) {
  const users = useAppStore((state) => state.users);
  return (
    <div className="h-[calc(100vh-2rem)] w-80 rounded-xl border-2 border-purple-500 p-4">
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
