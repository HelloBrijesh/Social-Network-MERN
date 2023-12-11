import Login from "./Login";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../services/api-client";
const LandingPage = () => {
  const { userDetails } = useUserContext();

  if (!userDetails) {
    return <Login></Login>;
  }
  return (
    <>
      <div className="font-custom">
        <div className="h-[60px]">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default LandingPage;
