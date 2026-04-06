import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Comparison from "@/pages/Comparison.tsx";
import Portfolio from "@/pages/Portfolio.tsx";
import EarlyWarning from "@/pages/EarlyWarning.tsx";
import Status from "@/pages/Status.tsx";
import NotFound from "@/pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/comparison", element: <Comparison /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/early-warning", element: <EarlyWarning /> },
      { path: "/status", element: <Status /> },
      { path: "*", element: <NotFound /> }
    ],
  },
]);

export default router;