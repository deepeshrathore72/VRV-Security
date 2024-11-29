import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function ProtectedRoute({ children, requiredRole }) {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Restore userInfo from localStorage if not already set
        const storedUserInfo = localStorage.getItem('userInfo');
        if (!userInfo && storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
        setLoading(false); // Stop loading once userInfo is restored
    }, [userInfo, setUserInfo]);

    // If loading, show a spinner or placeholder
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect if not logged in or role doesn't match
    if (!userInfo || !userInfo.role) {
        return <Navigate to="/login" />;
    }

    if (userInfo.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
}
