import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/UserContext";
const CreatePost = ({ isVisible, onClose }) => {
  const { userDetails } = useUserContext();

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed shadow-lg inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[500px] flex flex-col rounded-lg">
          <div className="relative text-center p-3">
            <h1 className="text-xl font-bold mb-2">Create Post</h1>
            <button
              onClick={() => onClose()}
              className="absolute right-5 top-3 text-xl font-semibold "
            >
              X
            </button>
          </div>
          <hr></hr>
          <form className="p-5">
            <div className="flex gap-3">
              <div className="">
                {userDetails.profileImage === "" ? (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-[20px] h-[20px] bg-white-smoke p-3 rounded-full border-white border-4"
                  />
                ) : (
                  <img
                    src={`${userDetails.profileImage}`}
                    alt=""
                    className="w-[60px] h-[50px] rounded-full border-white border-4"
                  />
                )}
              </div>
              <div className="text-sm">
                <p className="font-bold">
                  {userDetails.firstName} {userDetails.lastName}
                </p>
                <p className="text-slate-500">time</p>
              </div>
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                className="w-full my-3"
                placeholder={`What's on your mind, ${userDetails.firstName} ?`}
              ></textarea>
            </div>
            <div className="flex justify-between py-5 px-3 mb-5 border rounded-lg">
              <p className="">Add to your post</p>
              <FontAwesomeIcon icon={faImage} className="text-2xl" />
            </div>
            <div className="text-center">
              <button className="w-full p-3 bg-blue font-bold text-white text-lg border border-none rounded-lg">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
