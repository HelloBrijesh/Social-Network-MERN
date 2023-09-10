const LogInForm = () => {
  return (
    <>
      <form className="p-5">
        <div className="my-3 border rounded-lg p-3">
          <input
            placeholder="Email or Phone number"
            type="text"
            className="w-full focus:outline-none "
          />
        </div>
        <div className="my-3 border rounded-lg p-3">
          <input
            placeholder="Password"
            type="password"
            className="w-full focus:outline-none"
          />
        </div>
        <div className="my-3">
          <button className="bg-blue w-full p-3 font-semibold text-white text-xl border border-none rounded-lg">
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
