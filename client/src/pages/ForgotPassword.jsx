import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isError, setIsError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { userDetails } = useUserContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      return navigate("/");
    }
  }, []);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      setIsError(null);
      setSubmitting(true);
      setSubmitted(false);
      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/forgot-password`,
          { email: values.email }
        );
        setSubmitted(true);
      } catch (error) {
        setIsError(error.response.data.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white-smoke h-screen font-custom flex flex-col justify-center items-center">
      {isError && <p className="text-red-500 ">Error : {isError}</p>}
      {submitting && <p>submitting</p>}
      {submitted && <p>Reset Password link has been sent to your email</p>}
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="">
          <input
            placeholder="Email"
            type="email"
            id="email"
            className="w-full my-3 border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-600 "
            {...getFieldProps("email")}
          />
        </div>
        <div className="my-3">
          <button
            type="submit"
            className="bg-blue disabled:opacity-80 w-full p-3 font-semibold text-white text-xl border border-none rounded-lg"
            disabled={submitted}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
