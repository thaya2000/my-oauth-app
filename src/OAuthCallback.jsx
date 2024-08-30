import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  const exchangeAuthorizationCode = async (authorizationCode) => {
    try {
      const tokenUrl = "http://192.168.1.104:9000/oauth2/token";
      const data = new URLSearchParams({
        client_id: "oidc-client",
        client_secret: "secret",
        code: authorizationCode,
        redirect_uri: "http://192.168.1.104:5173/oauth/callback",
        grant_type: "authorization_code",
        code_verifier:
          "1QT1dVHhvjX_ZeE7EtzYWgyrX7J95GMyQ6zc5sD7rSNE3bPNj2WxSoNaq5FDjaplJ9c3hepPQeh048gx1rt09N_QbpjXlzRTMtD-IT01zpIzkD9chpfXTzohdZdIjQaD",
      });

      console.log("Sending POST request to:", tokenUrl);
      console.log("Request data:", data.toString());

      const response = await axios.post(tokenUrl, data.toString(), {
        headers: {
          method: "POST",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa("oidc-client:secret"), // For 'client_secret_basic' method
        },
      });

      console.log("Response received:", response);

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      console.log("Navigate to Home Page");
      navigate("/home");
    } catch (error) {
      console.error(
        "Failed to exchange authorization code:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get("code");

    if (authorizationCode) {
      exchangeAuthorizationCode(authorizationCode);
    } else {
      console.error("Authorization code not found.");
    }
  }, []);

  return <div>Loading...</div>;
};

export default OAuthCallback;
