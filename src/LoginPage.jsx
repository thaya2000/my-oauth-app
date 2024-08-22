const LoginPage = () => {
  const handleLogin = () => {
    const clientId = "oidc-client";
    const redirectUri = "http://127.0.0.1:5173/oauth/callback";
    const authorizationUrl = "http://127.0.0.1:9000/oauth2/authorize";
    const scope = "openid profile";
    const responseType = "code";

    const authUrl = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };

  // Example usage in a component
  return <button onClick={handleLogin}>Login with OAuth2</button>;
};

export default LoginPage;
