import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import { useUserContext } from "../../context/UserContext";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const commentContentRef = useRef(false);

  const { userDetails } = useUserContext();
  useEffect(() => {
    axiosAuthInstance
      .get(`/users/posts/${postId}/comments`)
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleComment = async () => {
    const commentContent = commentContentRef.current.value;
    if (commentContent !== false && commentContent !== "") {
      try {
        const response = await axiosAuthInstance.post(
          `/users/posts/${postId}/comment`,
          { commentContent }
        );
        setComments(response.data.data);
        commentContentRef.current.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/users/posts/${postId}/comments/${commentId}`
      );
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex items-center mx-2 py-2 gap-3">
              <div className="">
                {comment.commentedBy.profileImage === "" ? (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-[20px] h-[20px] p-3 bg-white-smoke rounded-full border-white border-4"
                  />
                ) : (
                  <img
                    src={`${comment.commentedBy.profileImage}`}
                    alt=""
                    className="w-[50px] h-[45px] rounded-full border-white border-4"
                  />
                )}
              </div>
              <div className=" bg-slate-100 w-full px-3 py-3 rounded-2xl">
                <div className="font-semibold">
                  {comment.commentedBy.firstName} {comment.commentedBy.lastName}
                  <button
                    className="ms-5"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
                <p>{comment.commentContent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center px-2 py-2 gap-3">
        <div className="">
          {userDetails.profileImage === "" ? (
            <FontAwesomeIcon
              icon={faUser}
              className="w-[20px] h-[20px] p-3 bg-white-smoke rounded-full border-white border-4"
            />
          ) : (
            <img
              src={`${userDetails.profileImage}`}
              alt=""
              className="w-[60px] h-[50px] rounded-full border-white border-4"
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Write a comment..."
          className="focus:outline-none font-bolder text-start p-2 bg-white-smoke w-full rounded-3xl text-slate-500"
          ref={commentContentRef}
        />
        <button className=" disabled:opacity-60" onClick={handleComment}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
    </div>
  );
};

export default Comments;
