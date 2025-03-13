import { useOktaAuth } from "@okta/okta-react";

const Register = () => {
  const { oktaAuth } = useOktaAuth();

  const handleRegister = () => {
    oktaAuth.signInWithRedirect({
      originalUri: "/dashboard",
      extraParams: { fromURI: "/dashboard", prompt: "create" },
    });
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <button onClick={handleRegister}>Sign Up with Okta</button>
    </div>
  );
};

export default Register;
