import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import FriendList from "./components/FriendList";
import FriendRequest from "./components/FriendRequest";
import FindFriends from "./components/FindFriends";
import Profile from "./pages/Profile";
import Timeline from "./components/Timeline";
import About from "./components/About";
import Photos from "./components/Photos";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<LandingPage />}>
          <Route path="" element={<Home />} />
          <Route path="friends" element={<Friends />}>
            <Route path="" element={<FriendList />} />
            <Route path="friend-request" element={<FriendRequest />} />
            <Route path="find-friends" element={<FindFriends />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<Timeline />} />
            <Route path="about" element={<About />} />
            <Route path="friendlist" element={<FriendList />} />
            <Route path="photos" element={<Photos />} />
          </Route>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
