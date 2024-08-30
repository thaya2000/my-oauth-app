import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  console.log("isAuthenticated : ", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://192.168.1.104:9000/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("access_token");

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
