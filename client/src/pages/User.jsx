import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const User = () => {
  return (
    <>
      <div className="h-[60px]">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default User;
