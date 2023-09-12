import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Friends from "./pages/Friends.jsx";
import About from "./components/About.jsx";
import Feeds from "./components/Feeds";
import User from "./pages/User";
import FriendsList from "./components/FriendsList";
import Timeline from "./components/Timeline.jsx";
import Photos from "./components/Photos.jsx";
import FindFriends from "./components/FindFriends.jsx";
import FriendsRequests from "./components/FriendsRequests.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Feeds />,
          },
        ],
      },
      {
        path: "friends",
        element: <Friends />,
        children: [
          {
            path: "",
            element: <FriendsList />,
          },
          {
            path: "find",
            element: <FindFriends />,
          },
          {
            path: "friendrequests",
            element: <FriendsRequests />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "about",
            element: <About />,
          },
          {
            path: "friends",
            element: <FriendsList />,
          },
          {
            path: "photos",
            element: <Photos />,
          },
          {
            path: "timeline",
            element: <Timeline />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
