import Home from "../pages/Home";
import Ponds from "../pages/Ponds";
import History from "../pages/History";
import Stats from "../pages/Stats";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "/ponds",
    element: (
      <div>
        <Ponds />
      </div>
    ),
  },
  {
    path: "/history",
    element: (
      <div>
        <History />
      </div>
    ),
  },
  {
    path: "/stats",
    element: (
      <div>
        <Stats />
      </div>
    ),
  },
]);

const RoutePage = () => {
  //   const direct = (props) => {
  //     let path = props.target.dataset.value;
  //     history.push(path);
  //   };

  return <RouterProvider router={router} />;
};

export default RoutePage;
