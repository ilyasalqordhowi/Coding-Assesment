import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home";
import { Create } from "./page/Create";
import { Update } from "./page/Update";

const page = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
]);

function App() {
  return <RouterProvider router={page} />;
}

export default App;
