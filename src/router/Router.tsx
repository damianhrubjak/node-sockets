import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import SideMenu from "@/components/SideMenu";
import AppWrapper from "@/layouts/AppWrapper";
import Chat from "@/pages/Chat";
import Home from "@/pages/Home";
import SocketProvider from "@/services/providers/SocketProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <SideMenu />
        <AppWrapper>
          <SocketProvider>
            <Outlet />
          </SocketProvider>
        </AppWrapper>
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "chat", element: <Chat /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
