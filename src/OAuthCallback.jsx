import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  const exchangeAuthorizationCode = async (authorizationCode) => {
    try {
      const tokenUrl = "http://127.0.0.1:9000/oauth2/token";
      const data = new URLSearchParams({
        client_id: "oidc-client",
        client_secret: "secret",
        code: authorizationCode,
        redirect_uri: "http://127.0.0.1:5173/oauth/callback",
        grant_type: "authorization_code",
      });

      const response = await axios.post(tokenUrl, data.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa("oidc-client:secret"), // For 'client_secret_basic' method
        },
      });

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
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
