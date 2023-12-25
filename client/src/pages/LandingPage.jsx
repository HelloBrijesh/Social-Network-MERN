import Login from "./Login";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserContext } from "../context/UserContext";
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
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
