const SignUpForm = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[500px] flex flex-col rounded-lg">
          <div className="flex justify-between items-start border-0 border-b-2">
            <div className="p-5">
              <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
              <p>It’s quick and easy.</p>
            </div>
            <button
              onClick={() => onClose()}
              className="text-xl font-semibold p-5"
            >
              X
            </button>
          </div>
          <form className="p-5">
            <div className="mb-4 flex justify-between">
              <div className="border p-2 rounded-lg">
                <input
                  placeholder="First Name"
                  type="text"
                  className="focus:outline-none"
                />
              </div>
              <div className="border p-2 rounded-lg">
                <input
                  placeholder="Last Name"
                  type="text"
                  className="focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4 border p-2 rounded-lg">
              <input
                placeholder="Mobile number or email"
                type="tel"
                className="focus:outline-none"
              />
            </div>
            <div className="mb-4 border p-2 rounded-lg">
              <input
                placeholder="New Password"
                type="password"
                className="focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <p>Birthday</p>
              <input type="date" className="focus:outline-none"></input>
            </div>
            <div className="mb-5">
              <p>Gender</p>
              <div className="flex gap-5">
                <div>
                  <label htmlFor="male" className="me-5">
                    Male
                  </label>
                  <input type="radio" id="male" name="gender" value="male" />
                </div>
                <div>
                  <label htmlFor="female" className="me-5">
                    Female
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
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
