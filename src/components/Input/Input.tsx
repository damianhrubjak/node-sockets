import { ChangeEvent, InputHTMLAttributes, useRef } from "react";

import { debounce } from "lodash-es";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onDebouncedChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ onDebouncedChange = () => undefined, ...rest }: Props) {
  const debouncedHandler = useRef(
    debounce(async (e) => {
      onDebouncedChange(e);
    }, 300)
  ).current;

  return (
    <input
      {...rest}
      onChange={debouncedHandler}
      className={`w-full rounded-md border-none bg-gray-800 px-4 py-3 text-xl placeholder-slate-400 outline-none ring-2 ring-transparent transition duration-300 focus:ring-purple-500 ${rest.className}`}
    />
  );
}
export default Input;
