import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	// Get token from localStorage
	const token = localStorage.getItem("accessToken");

	// If token exists, render child routes (Outlet), else redirect to login
	return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
