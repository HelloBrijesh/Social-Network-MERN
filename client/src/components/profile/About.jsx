import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";
import { axiosAuthInstance } from "../../services/api-client";

const About = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { userDetails } = useUserContext();
  const [profileDetails, setProfileDetails] = useState(null);

  let { userId } = useParams();
  useEffect(() => {
    axiosAuthInstance
      .get(`/users/${userId}/profile-details`)
      .then((response) => {
        setProfileDetails(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showEditProfile]);

  if (profileDetails === null) {
    return <p>Loading</p>;
  }

  return (
    <div className="">
      <div className="relative text-right">
        {userDetails.id === profileDetails.id && (
          <div>
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
          </div>
        )}
        <table className="max-w-7xl w-3/4 mx-auto text-base text-left tracking-wider">
          <tbody>
            <tr>
              <td className="px-6 py-4 font-bold">First Name</td>
              <td className="px-6 py-4">{profileDetails.firstName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Last Name</td>
              <td className="px-6 py-4">{profileDetails.lastName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Workplace</td>
              <td className="px-6 py-4">{profileDetails.workplace}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">College</td>
              <td className="px-6 py-4">{profileDetails.college}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">HighSchool</td>
              <td className="px-6 py-4">{profileDetails.highSchool}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Home town</td>
              <td className="px-6 py-4">{profileDetails.homeTown}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">City</td>
              <td className="px-6 py-4">{profileDetails.city}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">E mail</td>
              <td className="px-6 py-4">{profileDetails.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
