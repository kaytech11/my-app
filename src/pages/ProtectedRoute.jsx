import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();

  // safely parse user from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    user = null;
  }

  if (!user) {
    // redirect to signin and keep track of where user came from
    // ✅ This is what prevents showing Home.jsx when no user exists
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // ✅ If user exists (from localStorage or redux), show children
  return children;
}

export default ProtectedRoute;

