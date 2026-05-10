import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Taximetro from "../pages/Taximetro/Taximetro";
import GeneralError from "../pages/system/GeneralError";
import NotFoundPage from "../pages/system/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <GeneralError />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Taximetro /> }],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
