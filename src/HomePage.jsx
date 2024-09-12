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
    const clientId = `${import.meta.env.VITE_APP_CLIENT_ID}`;
    const redirectUri = `${import.meta.env.VITE_APP_SERVER_URL}`;
    const authorizationUrl = `${import.meta.env.VITE_APP_SERVER_URL}/logout`;
    const logoutUrl = `${authorizationUrl}?post_logout_redirect_uri=${redirectUri}`;
    console.log("logoutUrl : ", logoutUrl);
    window.location.href = logoutUrl;

    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
