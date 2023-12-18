import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import EditProfile from "./EditProfile";

const About = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { userDetails } = useUserContext();
  return (
    <div className="">
      <div className="relative text-right">
        <EditProfile
          isVisible={showEditProfile}
          onClose={() => setShowEditProfile(false)}
        />
        <button
          onClick={() => setShowEditProfile(true)}
          className="px-5 py-2 mt-5 bg-blue text-white rounded-lg"
        >
          Edit Profile
        </button>
        <table className="max-w-7xl w-3/4 mx-auto text-base text-left tracking-wider">
          <tbody>
            <tr>
              <td className="px-6 py-4 font-bold">First Name</td>
              <td className="px-6 py-4">{userDetails.firstName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Last Name</td>
              <td className="px-6 py-4">{userDetails.lastName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Workplace</td>
              <td className="px-6 py-4">{userDetails.workplace}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">College</td>
              <td className="px-6 py-4">{userDetails.college}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">HighSchool</td>
              <td className="px-6 py-4">{userDetails.highSchool}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Home town</td>
              <td className="px-6 py-4">{userDetails.homeTown}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">City</td>
              <td className="px-6 py-4">{userDetails.city}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">E mail</td>
              <td className="px-6 py-4">{userDetails.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
