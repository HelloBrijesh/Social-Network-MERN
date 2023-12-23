import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/UserContext";
import useUpdateImage from "../../hooks/useUpdateImage";
const ProfileImage = ({ isVisible, onClose }) => {
  const { userDetails } = useUserContext();
  const { submitting, isError, updateProfileImage, deleteProfileImage } =
    useUpdateImage();
  const handleProfileImage = async (e) => {
    await updateProfileImage(e);
  };

  const deleteImage = async () => {
    await deleteProfileImage();
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white flex flex-col justify-between h-[400px] w-[400px] rounded-lg pb-5">
          <div className="flex border-b-2 py-2">
            {isError && (
              <p className="text-red-500 ms-5 w-full">
                Error : Please Try Again
              </p>
            )}
            {submitting && <p className="ms-5 w-full">Submitting...</p>}
            <div className="text-end w-full">
              <button
                onClick={() => onClose()}
                className="me-4 text-xl font-semibold text-end"
              >
                X
              </button>
            </div>
          </div>
          <div className="mx-auto">
            {userDetails.profileImage === "" ? (
              <FontAwesomeIcon icon={faUser} className="text-[80px]" />
            ) : (
              <img
                src={`${userDetails.profileImage}`}
                alt=""
                className="w-[200px] h-[200px] mx-auto"
              />
            )}
          </div>
          <div className="flex justify-center gap-3">
            <button className="w-auto">
              <input
                id="bookImage"
                className="hidden border-0"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleProfileImage}
              />
              <label
                className="bg-blue flex items-center cursor-pointer px-5 py-2 text-white text-base rounded-lg"
                htmlFor="bookImage"
              >
                Upload
              </label>
            </button>
            <button
              onClick={deleteImage}
              className="text-base bg-red-600 text-white px-3 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImage;
