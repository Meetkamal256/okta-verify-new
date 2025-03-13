import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    if (!authState || authState.isPending) return; 
    
    if (!authState.isAuthenticated) {
      navigate("/");
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo({
          name: info.name || "Unknown",
          email: info.email || "No email found",
        });
      });
    }
  }, [authState, navigate, oktaAuth]);
  
  if (!authState || authState.isPending) {
    return <p>Loading authentication...</p>;
  }
  
  if (!authState.isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <p>This is a protected page. You need to be logged in to access it.</p>

      {userInfo ? (
        <>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}

      <button
        onClick={() =>
          oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin })
        }
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
