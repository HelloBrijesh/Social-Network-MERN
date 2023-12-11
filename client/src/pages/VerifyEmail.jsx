import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/auth/verify-email?token=${token}`
      );
      console.log(response);
    };
    verifyEmail();
  }, []);

  return (
    <>
      <div>dfgdfs</div>
    </>
  );
};

export default VerifyEmail;
