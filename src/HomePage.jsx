import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

const HomePage = () => {
  const navigate = useNavigate();

  // Check if the access token exists in cookies
  const isAuthenticated = !!Cookies.get("access_token");
  console.log("access_token : ", Cookies.get("access_token"));
  console.log("isAuthenticated : ", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      console.log("User is authenticated");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/logout`,
        {},
        { withCredentials: true }
      );

      console.log("Navigate to Login Page1");

      // Clear the cookies on the client side (just for visual confirmation, server should handle this)
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });

      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
