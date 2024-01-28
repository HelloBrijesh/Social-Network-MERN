import { useFormik } from "formik";
import { useUserContext } from "../../context/UserContext";
import useEditProfile from "../../hooks/useEditProfile";

const EditProfile = ({ isVisible, onClose }) => {
  const { userDetails } = useUserContext();

  const { isError, submitting, editProfile } = useEditProfile();

  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      city: userDetails.city,
      homeTown: userDetails.homeTown,
      college: userDetails.college,
      highSchool: userDetails.highSchool,
      workplace: userDetails.workplace,
    },
    onSubmit: async (values) => {
      await editProfile(values);
      onClose();
    },
  });

  if (!isVisible) return null;
  return (
    <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
      <div className="bg-white  pb-10 border border-slate-500 w-auto flex flex-col rounded-lg">
        <div className="flex justify-between items-start border-0 border-b-2">
          <div className="p-5">
            <h1 className="text-xl font-bold mb-2">Edit Profile</h1>
          </div>
          <button
            onClick={() => onClose()}
            className="text-xl font-semibold p-5"
          >
            X
          </button>
        </div>

        <form className="p-5" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="flex flex-col items-start gap-3">
              <label htmlFor="firstName">First Name</label>
              <input
                placeholder={`${userDetails.firstName}`}
                type="text"
                id="firstName"
                className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("firstName")}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <label htmlFor="lastName">Last Name</label>

              <input
                placeholder={`${userDetails.lastName}`}
                type="text"
                id="lastName"
                className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("lastName")}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="flex flex-col items-start gap-3">
              <label htmlFor="city">City</label>
              <input
                placeholder={`${userDetails.city}`}
                type="text"
                id="city"
                className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("city")}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <label htmlFor="homeTown">Home Town</label>

              <input
                placeholder={`${userDetails.homeTown}`}
                type="text"
                id="homeTown"
                className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("homeTown")}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="flex flex-col items-start gap-3">
              <label htmlFor="college">College</label>
              <input
                placeholder={`${userDetails.college}`}
                type="text"
                id="college"
                className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("college")}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <label htmlFor="highSchool">High School</label>

              <input
                placeholder={`${userDetails.highSchool}`}
                type="text"
                id="highSchool"
                className="border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
                {...getFieldProps("highSchool")}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <label htmlFor="workplace">Workplace</label>
            <input
              placeholder={`${userDetails.workplace}`}
              type="text"
              id="workplace"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
              {...getFieldProps("workplace")}
            />
          </div>

          <div className="text-center mt-5">
            <button
              type="submit"
              className="w-3/5 p-3 bg-green-500 font-bold text-white text-lg border border-none rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
        {submitting && (
          <p className="font-semibold text-center">submitting...</p>
        )}
        {isError && (
          <p className="font-semibold text-center text-red-500">
            Error Please Try Again Later
          </p>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
