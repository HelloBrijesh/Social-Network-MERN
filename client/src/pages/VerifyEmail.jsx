import { Link, useSearchParams } from "react-router-dom";
import useVerifyEmail from "../hooks/useVerifyEmail";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isError, submitting, isVerified } = useVerifyEmail(token);

  if (isError) {
    return (
      <div className="bg-white-smoke font-custom h-screen flex flex-col items-center justify-center">
        <p className=" text-red-500">Error : {isError}</p>
        <Link to="/">
          <button className="bg-blue mt-5 p-3 font-semibold text-white text-base border border-none rounded-lg">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="bg-white-smoke h-screen font-custom flex flex-col items-center justify-center">
        <p className=" text-red-500">Loading....</p>
      </div>
    );
  }

  return (
    <>
      {isVerified && (
        <div className="bg-white-smoke h-screen font-custom flex flex-col items-center justify-center">
          <p>Your Account has been verified Successfully</p>
          <Link to="/">
            <button className="bg-blue mt-5 p-3 font-semibold text-white text-xl border border-none rounded-lg">
              Home Page
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
