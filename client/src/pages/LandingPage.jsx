import { useState } from "react";
import LogInForm from "../components/LogInForm.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      <div className="bg-white-smoke h-screen">
        <div className="w-4/5 m-auto flex justify-between h-full items-center">
          <div className="w-3/5">
            <h1 className="text-blue text-6xl font-bold mb-3">
              Social Network
            </h1>
            <p className="text-3xl w-3/4">
              Connect with friends and the world around you on Facebook.
            </p>
          </div>
          <div className="w-2/5 bg-white border rounded-lg shadow-lg">
            <LogInForm />
            <div className="text-center mb-5">
              <button
                onClick={() => setShowSignUp(true)}
                className="w-3/5 p-3 bg-green-500 font-bold text-white text-lg border border-none rounded-lg"
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignUpForm isVisible={showSignUp} onClose={() => setShowSignUp(false)} />
    </>
  );
};

export default LandingPage;
