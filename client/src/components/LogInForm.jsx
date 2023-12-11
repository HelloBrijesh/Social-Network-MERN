import { useFormik } from "formik";
import useLogin from "../hooks/useLogin";

const LogInForm = () => {
  const { isError, submitting, loggedin, login } = useLogin();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <>
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
        <div className="">
          <input
            placeholder="Password"
            type="password"
            id="password"
            className="w-full my-3 border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-600"
            {...getFieldProps("password")}
          />
        </div>
        <div className="my-3">
          <button
            type="submit"
            className="bg-blue w-full p-3 font-semibold text-white text-xl border border-none rounded-lg"
          >
            Log In
          </button>
        </div>
        <p className="mb-5 text-center">Forgot password?</p>
        <hr className="my-5" />
      </form>
    </>
  );
};

export default LogInForm;
