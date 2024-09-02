const LoginPage = () => {
  const handleLogin = async () => {
    const clientId = "oidc-client";
    const redirectUri = `http://${
      import.meta.env.VITE_APP_IPADDRESS
    }:5173/oauth/callback`;
    const authorizationUrl = `http://${
      import.meta.env.VITE_APP_IPADDRESS
    }:9000/oauth2/authorize`;
    const scope = "openid profile";
    const responseType = "code";
    const codeChallenge = "fxYbsvx2bLsPKdvQ0Bs_TP3ArP4UIu2qQENfOiejOQ4";
    const codeChallengeMethod = "S256";

    const authUrl = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth2.0</button>
    </div>
  );
};

export default LoginPage;
