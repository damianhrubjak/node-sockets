import { NavLink } from "react-router-dom";

function SideMenu() {
  return (
    <div className="fixed inset-4 z-40 h-[100vh-2rem] w-80 rounded-2xl border-4 border-purple-400 p-4">
      <div className="mb-16 w-full">
        <h1 className="text-6xl font-thin text-purple-400">Čet</h1>
      </div>
      <div>
        <NavLink className={"menu-item"} to="/">
          Domov
        </NavLink>
        <NavLink className={"menu-item"} to="chat">
          Čet
        </NavLink>
      </div>
    </div>
  );
}

export default SideMenu;
