import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AppWrapper({ children }: Props) {
  return (
    <div className="relative mr-0 ml-auto min-h-screen w-[calc(100%-20rem-2rem)] p-4 pl-0">
      {children}
    </div>
  );
}

export default AppWrapper;
