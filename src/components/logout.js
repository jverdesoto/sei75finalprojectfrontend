import { useEffect } from "react";
import axios from "axios";
export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/logout/`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
          },
          { withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);
  return <div></div>;
};
