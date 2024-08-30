// import crypto from "crypto";

// const generateCodeVerifier = () => {
//   const array = new Uint32Array(56 / 2);
//   window.crypto.getRandomValues(array);
//   return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
//     ""
//   );
// };

// const generateCodeChallenge = async (verifier) => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(verifier);
//   const digest = await crypto.subtle.digest("SHA-256", data);
//   return btoa(String.fromCharCode(...new Uint8Array(digest)))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// };

const LoginPage = () => {
  const handleLogin = async () => {
    const clientId = "oidc-client";
    const redirectUri = "http://192.168.1.104:5173/oauth/callback";
    const authorizationUrl = "http://192.168.1.104:9000/oauth2/authorize";
    const scope = "openid profile";
    const responseType = "code";
    const codeChallenge = "fxYbsvx2bLsPKdvQ0Bs_TP3ArP4UIu2qQENfOiejOQ4";
    const codeChallengeMethod = "S256";

    const authUrl = `${authorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
    window.location.href = authUrl;
  };

  const handleGithubLogin = () => {
    const clientId = "Ov23lidmJ2Krbo4pQJ7N";
    const redirectUri = "http://192.168.1.104:9000/login/oauth2/code/github";
    const scope = "read:user";
    const githubAuthorizationUrl = "https://github.com/login/oauth/authorize";
    const responseType = "code";

    const authUrl = `${githubAuthorizationUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OIDC Client</button>
      <button onClick={handleGithubLogin}>Login with GitHub</button>
    </div>
  );
};

export default LoginPage;
