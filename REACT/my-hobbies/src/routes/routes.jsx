
import createBrowserRouter from "react-router-dom";
import App from '../App';
import { About, Gallery, Home } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: < Home/>,
          },
          {
            path: "/gallery",
            element: <Gallery />,
          },
          {
            path: "*",
            element: < About />,
          },
        ],
      },
]);