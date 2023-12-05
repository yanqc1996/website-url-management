import React, { lazy } from "react";
import ErrorPage from "@components/ErrorPage";
import LoginPage from "../layout/components/Login";
import App, { authLoader } from "../App";
import { createHashRouter, Navigate } from "react-router-dom";
import { TableOutlined } from "@ant-design/icons";
import Editor from "../pages/Edit";
import Upload from "../pages/Upload";
import Preview from "../pages/Preview";
const TablePage = lazy(() => import("../pages/TablePage"));

const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            title: "路由管理",
            icon: <TableOutlined />,
            element: <TablePage />,
          },
          {
            path: "*",
            element: <Navigate to="/" replace={true} />,
          },
        ],
      },
    ],
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/upload", element: <Upload /> },
  { path: "/preview", element: <Preview /> },
];

export { routes };

export default createHashRouter(routes);
