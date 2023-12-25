import { useFormik } from "formik";
import { Link } from "react-router-dom";
import useChangePassword from "../hooks/useChangePassword";
const ChangePassword = () => {
  const { isError, submitting, submitted, changePassword } =
    useChangePassword();
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      await changePassword(values);
    },
  });

  return (
    <div className="bg-white-smoke h-screen font-custom flex flex-col justify-center items-center">
      <div className=" w-[300px]">
        <div className="font-custom text-center mb-5">Change Password</div>
        {isError && (
          <p className="text-red-500 text-center">Error : {isError}</p>
        )}
        {submitting && <p>Loading...</p>}
        {submitted && (
          <p className="font-semibold">
            Password has been changed successfully
          </p>
        )}

        <form className="p-5" onSubmit={handleSubmit}>
          <div className="">
            <input
              placeholder="Current Password"
              type="password"
              id="currentPassword"
              className="w-full my-3 border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-600 "
              {...getFieldProps("currentPassword")}
            />
          </div>
          <div className="">
            <input
              placeholder="New Password"
              type="password"
              id="newPassword"
              className="w-full my-3 border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-600 "
              {...getFieldProps("newPassword")}
            />
          </div>
          <div className="my-3">
            <button
              type="submit"
              className="bg-blue disabled:opacity-75 w-full p-3 font-semibold text-white text-xl border border-none rounded-lg"
              disabled={submitted}
            >
              Submit
            </button>
          </div>
          {submitted && (
            <div className="my-5">
              <Link to="/">
                <button className="bg-blue w-full p-3  text-white text-xl border border-none rounded-lg">
                  Home Page
                </button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
