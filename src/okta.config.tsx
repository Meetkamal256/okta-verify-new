import { OktaAuth } from "@okta/okta-auth-js";

const isProduction = import.meta.env.MODE === "production";

const redirectUri = isProduction
  ? import.meta.env.VITE_OKTA_REDIRECT_URI_PROD
  : import.meta.env.VITE_OKTA_REDIRECT_URI;

const oktaAuth = new OktaAuth({
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  redirectUri,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  storageManager: {
    token: {
      storageTypes: ["sessionStorage"], 
    },
    cache: {
      storageTypes: ["sessionStorage"], 
    },
  },
});

export default oktaAuth;
