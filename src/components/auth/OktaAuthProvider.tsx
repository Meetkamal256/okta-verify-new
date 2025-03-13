import React from "react";
import { Security } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import oktaAuth from "../../okta.config";

const OktaAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    navigate(originalUri || "/dashboard");
  };
  
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};

export default OktaAuthProvider;
