import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const Post = () => {
  return (
    <>
      <div className="w-2/4 mx-auto border rounded-lg p-5">
        <div className="flex items-center border-b-2 pb-3">
          <img
            src="profileImage.jpg"
            alt=""
            className="w-[50px] h-[50px] rounded-full me-4"
          />
          <p>User Name</p>
        </div>
        <div className="my-3 border-b-2 pb-5">
          <p className="my-5">
            We are hiring! Looking for applicants who are interested full-time
            employment opportunity. Open Work permit holders welcome to contact.
            Check the post for more details and requirements of the position.
            Please contact at Ksm.hiring.2082@gmail.com Thanks!
          </p>
          <img src="banner.jpg" alt="" />
        </div>
        <div className="flex justify-around border-b-2 pb-3">
          <div>
            <FontAwesomeIcon icon={faThumbsUp} className="me-3" />
            Like
          </div>
          <div>
            <FontAwesomeIcon icon={faMessage} className="me-3" />
            Comment
          </div>
          <div>
            <FontAwesomeIcon icon={faShareFromSquare} className="me-3" />
            Share
          </div>
        </div>
        <div className="mt-5 flex justify-around items-center">
          <img
            src="profileImage.jpg"
            alt=""
            className="w-[50px] h-[50px] rounded-full me-4"
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="write a comment..."
            className="bg-white-smoke px-2 rounded-md leading-6 focus:outline-none"
          ></textarea>
          <button>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
