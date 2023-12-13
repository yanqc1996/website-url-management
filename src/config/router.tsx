import { lazy } from "react";
import { TableOutlined } from "@ant-design/icons";
import { createHashRouter, Navigate } from "react-router-dom";
import ErrorPage from "@components/ErrorPage";
import App, { authLoader } from "../App";
import Editor from "../pages/Edit";
import Upload from "../pages/Upload";
import Preview from "../pages/Preview";
import LoginPage from "../layout/components/Login";
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
          { path: "/upload", title: "文件上传", element: <Upload /> },
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
  { path: "/preview", element: <Preview /> },
];

export { routes };

export default createHashRouter(routes);
