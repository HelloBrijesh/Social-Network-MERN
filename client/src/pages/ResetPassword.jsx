import { Link, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import useResetPassword from "../hooks/useResetPassword";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { isError, submitting, submitted, resetPassword } =
    useResetPassword(token);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      await resetPassword(values.password);
    },
  });

  if (submitted) {
    return (
      <div className="bg-white-smoke h-screen font-custom flex flex-col justify-center items-center">
        <p>Password changed successfully</p>
        <Link to="/">
          <button className="bg-blue mt-5 p-3 font-semibold text-white text-xl border border-none rounded-lg">
            Home Page
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white-smoke h-screen font-custom flex flex-col justify-center items-center">
      {isError && <p className="text-red-500 ">Error : {isError}</p>}
      {submitting && <p>submitting</p>}
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="font-custom text-center mb-5">Enter New Password</div>
        <div className="">
          <input
            placeholder="Password"
            type="password"
            id="password"
            className="w-full my-3 border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-600 "
            {...getFieldProps("password")}
          />
        </div>
        <div className="my-3">
          <button
            type="submit"
            className="bg-blue w-full p-3 font-semibold text-white text-xl border border-none rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
