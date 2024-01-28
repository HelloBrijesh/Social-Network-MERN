import axios from "axios";
import { jwtDecode } from "jwt-decode";

// export const axiosAuthInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_SERVER_URL}`,
// });

// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const axiosAuthInstance = axios.create({ baseURL: "/api/v1" });

axiosAuthInstance.interceptors.request.use(
  async (request) => {
    if (!request.headers.authorization) {
      try {
        const response = await axios.get(`/api/v1/auth/refresh`, {
          withCredentials: true,
        });
        request.headers["authorization"] = "Bearer " + response.data.data;
        axiosAuthInstance.defaults.headers.common[
          "authorization"
        ] = `Bearer ${response.data.data}`;
        return request;
      } catch (error) {
        if (error.response.data.message === "Invalid Refresh Token") {
          delete axiosAuthInstance.defaults.headers.common["authorization"];
          localStorage.setItem("userDetails", null);
          window.location = "/";
        }
      }
    }

    if (request.headers.authorization) {
      const accessToken = request.headers.authorization.split(" ")[1];
      const decodedToken = jwtDecode(accessToken);
      let currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get(`/api/v1/auth/refresh`, {
            withCredentials: true,
          });
          request.headers["authorization"] = "Bearer " + response.data.data;
          axiosAuthInstance.defaults.headers.common[
            "authorization"
          ] = `Bearer ${response.data.data}`;
          return request;
        } catch (error) {
          if (error.response.data.message === "Invalid Refresh Token") {
            delete axiosAuthInstance.defaults.headers.common["authorization"];
            localStorage.setItem("userDetails", null);
            window.location = "/";
          }
        }
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.data.message === "Invalid Access Token") {
      try {
        const response = await axios.post(`/api/v1/auth/refresh`, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
      delete axiosAuthInstance.defaults.headers.common["authorization"];
      localStorage.setItem("userDetails", null);
      window.location = "/";
    }
    return Promise.reject(error);
  }
);
