import Login from "./Login";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUserContext } from "../context/UserContext";
const LandingPage = () => {
  const { loginStatus } = useUserContext();

  if (!loginStatus) {
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
