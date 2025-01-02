import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import MuxDemoPage from "./pages/mux-demo";
import SigmaPage from "./pages/sigma-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/hls-demo",
    element: <MuxDemoPage />,
  },
  {
    path: "/sigma-demo",
    element: <SigmaPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
