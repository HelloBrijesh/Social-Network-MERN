import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <>
      <div className="h-[60px]">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default User;
