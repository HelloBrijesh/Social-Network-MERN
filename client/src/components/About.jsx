const About = () => {
  return (
    <div className="">
      <div className="relative text-right">
        <button className="px-5 py-2 mt-5 bg-blue text-white rounded-lg">
          Edit Profile
        </button>
        <table className="max-w-7xl w-3/4 mx-auto text-base text-left tracking-wider">
          <tbody>
            <tr>
              <td className="px-6 py-4 font-bold">Workplace</td>
              <td className="px-6 py-4">Google</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">College</td>
              <td className="px-6 py-4">S K Patel</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">HighSchool</td>
              <td className="px-6 py-4">Ganpat</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">Home town</td>
              <td className="px-6 py-4">Winnipeg</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">City</td>
              <td className="px-6 py-4">Winnipeg</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold">E mail</td>
              <td className="px-6 py-4">email@email.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
