import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/UserContext";
import useComment from "../../hooks/useComment";

const Comments = ({ postId }) => {
  const { userDetails } = useUserContext();
  const {
    isLoading,
    error,
    comments,
    commentContentRef,
    addComment,
    deleteComment,
  } = useComment(postId);

  if (isLoading) {
    return <p>{isLoading}</p>;
  }
  if (error) {
    return <p>Something Went wrong</p>;
  }

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
        <button className=" disabled:opacity-60" onClick={addComment}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
    </div>
  );
};

export default Comments;
