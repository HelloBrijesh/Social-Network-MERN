import { useState } from "react";
import LogInForm from "../components/landingPage/LogInForm.jsx";
import SignUpForm from "../components/landingPage/SignUpForm.jsx";
const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <div className="bg-white-smoke h-screen font-custom">
        <div className="w-4/5 m-auto flex flex-col md:flex-row justify-between h-full items-center">
          <div className="w-full text-center md:text-start md:w-3/5 my-10 md:my-0">
            <h1 className="text-blue text-3xl md:text-6xl font-bold mb-3">
              Social Network
            </h1>
            <p className="text-xl md:text-3xl w-full md:w-3/4">
              Connect with friends and the world around you on Social Network.
            </p>
          </div>
          <div className="w-full md:w-2/5 bg-white border rounded-lg shadow-lg">
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

export default Login;
