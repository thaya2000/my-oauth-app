import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const OAuthCallback = () => {
  const navigate = useNavigate();

  const exchangeAuthorizationCode = async (authorizationCode) => {
    try {
      const tokenUrl = `http://${
        import.meta.env.VITE_APP_IPADDRESS
      }:9000/oauth2/token`;
      const data = new URLSearchParams({
        client_id: "oidc-client",
        client_secret: "secret",
        code: authorizationCode,
        redirect_uri: `http://${
          import.meta.env.VITE_APP_IPADDRESS
        }:5173/oauth/callback`,
        grant_type: "authorization_code",
        code_verifier:
          "1QT1dVHhvjX_ZeE7EtzYWgyrX7J95GMyQ6zc5sD7rSNE3bPNj2WxSoNaq5FDjaplJ9c3hepPQeh048gx1rt09N_QbpjXlzRTMtD-IT01zpIzkD9chpfXTzohdZdIjQaD",
      });

      const response = await axios.post(tokenUrl, data.toString(), {
        headers: {
          method: "POST",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa("oidc-client:secret"), // For 'client_secret_basic' method
        },
      });

      console.log("Response from token endpoint:", response.data);

      // document.cookie = `access_token=${response.data.access_token}`;
      // document.cookie = `refresh_token=${response.data.refresh_token}; Secure; SameSite=Lax; path=/`;

      Cookies.set("access_token", response.data.access_token, {
        sameSite: "Lax",
        path: "/",
      });
      Cookies.set("refresh_token", response.data.refresh_token, {
        sameSite: "Lax",
        path: "/",
      });

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
