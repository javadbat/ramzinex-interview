import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const List = lazy(() => import("../../pages/list/List"));
const Detail = lazy(() => import("../../pages/detail/Detail.tsx"));
import Layout from "../../pages/layout/Layout";
import RouterError from "./RouterError";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <RouterError />,
    children: [
      {
        path: '/',
        Component: List,
      },
      {
        path: 'chat',
        Component: Detail,
      }
    ],
  },
]);