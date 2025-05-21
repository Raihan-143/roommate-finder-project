import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Components/PrivateRoute";
import MyListings from "../Pages/MyListings";
import UpdateListing from "../Pages/UpdateListing";
import RoomMateDetails from "../Pages/RoomMateDetails";
import NotFound from "../Pages/NotFound";
import AddListing from "../Pages/AddListing";
import BrowseListings from "../Pages/BrowseListings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "add", element: <PrivateRoute><AddListing /></PrivateRoute> },
      { path: "browse", element: <BrowseListings /> },
      { path: "my-listings", element: <PrivateRoute><MyListings /></PrivateRoute> },
      { path: "update/:id", element: <PrivateRoute><UpdateListing /></PrivateRoute> },
      { path: "roommates/:id", element: <PrivateRoute><RoomMateDetails /></PrivateRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
