import { useFormik } from "formik";
import useSignup from "../../hooks/useSignup";

const SignUpForm = () => {
  const { isError, submitting, isSignedup, signup } = useSignup();
  const { handleSubmit, errors, touched, resetForm, getFieldProps } = useFormik(
    {
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
        resetForm();
      },
    }
  );

  return (
    <>
      <div className="bg-white max-w-[500px] flex flex-col rounded-lg my-5">
        <h1 className="text-2xl border-0 border-b-2 text-center md:text-3xl font-bold pb-5">
          Sign Up
        </h1>
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
    </>
  );
};

export default SignUpForm;
