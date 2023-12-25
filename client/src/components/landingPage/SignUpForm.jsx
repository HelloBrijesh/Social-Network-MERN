import { useFormik } from "formik";
import useSignup from "../../hooks/useSignup";

const SignUpForm = ({ isVisible, onClose }) => {
  const { isError, submitting, isSignedup, signup } = useSignup();
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: async (values) => {
      await signup(values);
    },
  });

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white max-w-[500px] flex flex-col rounded-lg">
          <div className="flex justify-between items-start border-0 border-b-2">
            <div className="p-5">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">Sign Up</h1>
              <p className="text-base md:text-xl">It’s quick and easy.</p>
            </div>
            <button
              onClick={() => onClose()}
              className="text-xl font-semibold p-5"
            >
              X
            </button>
          </div>
          {isError && (
            <p className="text-center py-3 text-red-500">Error...{isError}</p>
          )}
          {submitting && (
            <p className="text-center py-3 text-red-500">Loading...</p>
          )}
          {isSignedup && (
            <p className="text-center py-3">
              Registered Successfully please click on the link you received in
              email to varify the account
            </p>
          )}
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col md:flex-row gap-5 justify-between">
              <div className="">
                <input
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                  {...getFieldProps("firstName")}
                />
              </div>
              <div className="">
                <input
                  placeholder="Last Name"
                  type="text"
                  id="lastName"
                  className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                  {...getFieldProps("lastName")}
                />
              </div>
            </div>
            <div className="">
              <input
                placeholder="Enter email"
                type="email"
                id="email"
                className="w-full mb-4 border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("email")}
              />
            </div>
            <div className="">
              <input
                placeholder="Password"
                type="password"
                id="password"
                className="w-full mb-4 border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("password")}
              />
            </div>
            <div className="mb-4">
              <p>Birthday</p>
              <input
                type="date"
                id="dateOfBirth"
                className="focus:outline-none"
                {...getFieldProps("dateOfBirth")}
              ></input>
            </div>
            <div className="mb-5">
              <p>Gender</p>
              <div className="flex gap-5">
                <div>
                  <label htmlFor="male" className="me-5">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    {...getFieldProps("gender")}
                    checked={getFieldProps("gender").value === "male"}
                    value="male"
                  />
                </div>
                <div>
                  <label htmlFor="female" className="me-5">
                    Female
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    {...getFieldProps("gender")}
                    checked={getFieldProps("gender").value === "female"}
                    value="female"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="w-3/5 p-3 bg-green-500 font-bold text-white text-lg border border-none rounded-lg">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
