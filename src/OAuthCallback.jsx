import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Modal Component
const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Login Error</h2>
        <p className="mb-4 text-black">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

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

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null); // To store error messages
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  const exchangeAuthorizationCode = async (authorizationCode) => {
    try {
      const tokenUrl = `${import.meta.env.VITE_APP_SERVER_URL}/oauth2/token`;
      const data = new URLSearchParams({
        client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
        client_secret: `${import.meta.env.VITE_APP_CLIENT_SECRET}`,
        code: authorizationCode,
        redirect_uri: `${import.meta.env.VITE_APP_CLIENT_URL}/oauth/callback`,
        grant_type: "authorization_code",
        code_verifier:
          "1QT1dVHhvjX_ZeE7EtzYWgyrX7J95GMyQ6zc5sD7rSNE3bPNj2WxSoNaq5FDjaplJ9c3hepPQeh048gx1rt09N_QbpjXlzRTMtD-IT01zpIzkD9chpfXTzohdZdIjQaD",
      });

      try {
        const response = await axios.post(tokenUrl, data.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                `${import.meta.env.VITE_APP_CLIENT_ID}:${
                  import.meta.env.VITE_APP_CLIENT_SECRET
                }`
              ),
          },
        });

        Cookies.set("access_token", response.data.access_token, {
          path: "/",
        });
        Cookies.set("refresh_token", response.data.refresh_token, {
          path: "/",
        });

        navigate("/home"); // Navigate to home page on success
      } catch (error) {
        setErrorMessage(
          "Failed to exchange authorization code. Please try again."
        );
        setShowModal(true); // Show the modal with error message
        console.error("Error exchanging authorization code:", error.message);
      }
    } catch (error) {
      setErrorMessage(
        "Failed to exchange authorization code. Please try again."
      );
      setShowModal(true); // Show the modal with error message
      console.error("Error exchanging authorization code:", error.message);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get("code");
    const error = queryParams.get("error");
    const errorDescription = queryParams.get("error_description");

    if (error) {
      setErrorMessage(
        `Login failed: ${error || "An unexpected error occurred."}`
      );
      setShowModal(true); // Show modal on error
    } else if (authorizationCode) {
      exchangeAuthorizationCode(authorizationCode);
    } else {
      setErrorMessage(
        "Authorization code not found. Please try logging in again."
      );
      setShowModal(true); // Show modal on missing authorization code
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {showModal && (
        <Modal
          message={errorMessage}
          onClose={() => {
            setShowModal(false); // Close modal on "OK" button click
            handleLogout();
            // navigate("/");
          }}
        />
      )}
      {/* <div>Loading...</div> */}
    </div>
  );
};

export default OAuthCallback;
