
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

export const AdminRequireAuth = ({ children }) => {
    const { user, isAuthenticated } = useContext(AdminAuthContext);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        setIsChecking(false);
    }, []);

    if (isChecking) {
        return null;
    }

    if (!user || !isAuthenticated()) {
        return (
            <Navigate
                to="/backend/login"
                replace
                state={{ from: window.location.pathname }}
            />
        );
    }

    return children;
};

export default AdminRequireAuth;