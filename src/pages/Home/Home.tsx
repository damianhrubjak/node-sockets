import { FormEvent, useEffect } from "react";

import { isEmpty, isNull } from "lodash-es";
import { useNavigate } from "react-router-dom";

import Input from "@/components/Input";
import useAppStore from "@/services/store/useAppStore";
import useSocketStore from "@/services/store/useSocketStore";

function Home() {
  const { username, setUsername } = useAppStore((state) => ({
    username: state.username,
    setUsername: state.setUsername,
  }));
  const { socket } = useSocketStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(username) && !isNull(username)) {
      navigate("chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isEmpty(username) || isNull(username)) {
      return;
    }

    socket?.emit("new-user", { username: username, socketId: socket.id });
    navigate("chat");
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form className="w-full max-w-md" onSubmit={handleFormSubmit}>
        <div className="w-full">
          <label className="mb-1 block w-full text-lg" htmlFor="username-input">
            Používateľské meno
          </label>
          <Input
            className="block w-full bg-gray-900 p-4 text-xl font-bold outline-none"
            type="text"
            id="username-input"
            placeholder="Sem zadajte používateľské meno"
            onDebouncedChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mx-auto mt-8 block w-full max-w-xs rounded-md bg-purple-500 py-3 px-6 text-xl font-bold text-white"
        >
          Prihlásiť sa
        </button>
      </form>
    </div>
  );
}

export default Home;
