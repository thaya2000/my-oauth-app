import { useEffect } from "react";

const LoginPage = () => {
  const handleLogin = async () => {
    const clientId = `${import.meta.env.VITE_APP_CLIENT_ID}`;
    const redirectUri = `${import.meta.env.VITE_APP_CLIENT_URL}/oauth/callback`;
    const authorizationUrl = `${
      import.meta.env.VITE_APP_SERVER_URL
    }/oauth2/authorize`;
    const scope = "openid profile";
    const responseType = "code";
    const codeChallenge = "fxYbsvx2bLsPKdvQ0Bs_TP3ArP4UIu2qQENfOiejOQ4";
    const codeChallengeMethod = "S256";
    const authUrl = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;

    setTimeout(() => {
      window.location.href = authUrl;
    }, 300);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md mx-auto animate-fade-in-down">
        {/* <div className="mb-6 animate-pulse">
          <svg
            className="w-16 h-16 text-blue-500 mx-auto animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 3v6m0 6v6m4-9h6M6 12H0"
            />
          </svg>
        </div> */}
        <div class="flex justify-center items-center flex-row gap-2">
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 m-4 animate-bounce">
          Redirecting...
        </h1>
        <p className="text-gray-600 animate-fade-in">
          We're setting things up for you. Please wait a moment while we
          complete the login process.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
