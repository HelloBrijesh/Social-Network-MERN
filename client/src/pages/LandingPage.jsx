import { useState } from "react";
import Login from "./Login";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  if (!isLoggedIn) {
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
