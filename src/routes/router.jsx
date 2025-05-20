import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Components/PrivateRoute";
import AddRoomMate from "../Pages/AddRoomMate";
import BrowseRoomMates from "../Pages/BrowseRoomMates";
import MyListings from "../Pages/MyListings";
import UpdateListing from "../Pages/UpdateListing";
import RoomMateDetails from "../Pages/RoomMateDetails";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "add", element: <PrivateRoute><AddRoomMate /></PrivateRoute> },
      { path: "browse", element: <BrowseRoomMates /> },
      { path: "my-listings", element: <PrivateRoute><MyListings /></PrivateRoute> },
      { path: "update/:id", element: <PrivateRoute><UpdateListing /></PrivateRoute> },
      { path: "details/:id", element: <PrivateRoute><RoomMateDetails /></PrivateRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
