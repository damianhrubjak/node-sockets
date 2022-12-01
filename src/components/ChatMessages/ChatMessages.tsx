import { FormEvent, useEffect, useRef, useState } from "react";

import { isEmpty, isNull } from "lodash-es";

import useAppStore from "@/services/store/useAppStore";

import Input from "../Input";
import MessageItem from "../MessageItem";

type Props = {
  onSubmit: (text: string) => void;
};

function ChatMessages({ onSubmit }: Props) {
  const messages = useAppStore((state) => state.messages);
  const [text, setText] = useState("");
  const messagesDivRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isEmpty(text)) {
      return;
    }

    onSubmit(text);
    setText("");
    (e.target as HTMLFormElement).reset();
  };

  useEffect(() => {
    if (!isNull(messagesDivRef.current)) {
      console.log(messagesDivRef.current);
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex h-[calc(100vh-2rem)] w-[calc(100%-20rem-1rem)] flex-col gap-4">
      <div
        className="h-[calc(100%-52px)] w-full overflow-y-auto scroll-smooth px-2"
        ref={messagesDivRef}
      >
        {messages.map((message) => (
          <MessageItem
            message={message}
            key={`${message.date}-${message.message}-${message.username}`}
          />
        ))}
      </div>
      <form className="input flex gap-4" onSubmit={handleSubmit}>
        <Input
          className="w-[calc(100%-10rem)]"
          onDebouncedChange={(e) => setText(e.target.value)}
          placeholder="Sem zadajte správu"
          id="message-input"
        />
        <button
          type="submit"
          className="w-40 rounded-md bg-purple-600 text-xl font-bold transition duration-300 hover:bg-purple-800"
        >
          Odoslať
        </button>
      </form>
    </div>
  );
}

export default ChatMessages;
