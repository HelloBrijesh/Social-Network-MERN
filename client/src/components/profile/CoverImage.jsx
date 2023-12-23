import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/UserContext";
import useUpdateImage from "../../hooks/useUpdateImage";

const CoverImage = ({ isVisible, onClose }) => {
  const { userDetails } = useUserContext();
  const { submitting, isError, updateCoverImage, deleteCoverImage } =
    useUpdateImage();
  const handleCoverImage = async (e) => {
    await updateCoverImage(e);
  };

  const deleteImage = async () => {
    await deleteCoverImage();
  };

  if (!isVisible) return null;
  return (
    <>
      <div className="fixed z-999 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white flex flex-col justify-between pb-5 w-[800px] h-[350px] rounded-lg">
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
          <div className="text-center">
            {userDetails.coverImage === "" ? (
              <FontAwesomeIcon icon={faUser} className="text-[80px] " />
            ) : (
              <img
                src={`${userDetails.coverImage}`}
                alt=""
                className="w-full h-[200px] mx-auto"
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
                onChange={handleCoverImage}
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

          {/* <div className="flex justify-between">
            <div className="flex">
              <input
                id="bookImage"
                className="hidden border-0"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleCoverImage}
              />
              <label
                className="bg-blue flex items-center cursor-pointer px-2 py-3 font-semibold text-white text-base border border-none rounded-lg"
                htmlFor="bookImage"
              >
                Upload Image
              </label>
              <button
                onClick={deleteImage}
                className="text-xl font-semibold p-5"
              >
                Delete Image
              </button>
            </div>
            {isError && (
              <p className="text-red-500">Error : Please Try Again</p>
            )}
            <button
              onClick={() => onClose()}
              className="text-xl font-semibold p-5"
            >
              X
            </button>
          </div>
          <div className="h-[300px]">
            <div className="flex flex-col h-full justify-center border gap-5">
              {userDetails.coverImage === "" ? (
                <FontAwesomeIcon icon={faUser} className="text-[80px]" />
              ) : (
                <img
                  src={`${userDetails.coverImage}`}
                  alt=""
                  className="w-full h-[300px]"
                />
              )}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CoverImage;
