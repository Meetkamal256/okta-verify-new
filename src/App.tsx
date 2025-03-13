import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginCallback, Security, useOktaAuth } from "@okta/okta-react";
import Dashboard from "./pages/dashboard/Dashboard";
import oktaAuth from "./okta.config";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { JSX } from "react";

// Custom ProtectedRoute Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { authState } = useOktaAuth();
  
  if (!authState || authState.isPending) return <p>Loading...</p>;
  
  return authState.isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const navigate = useNavigate();
  
  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={(_oktaAuth, originalUri) => {
        navigate(originalUri || "/dashboard");
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Security>
  );
};

export default App;
