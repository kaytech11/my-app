import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ResetPassword from "../pages/ResetPassword";

const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/signin"); // redirect if not logged in
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/signin");
    };

    if (!user) return null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
             <h2 className="text-xl font-bold mb-4">My Account</h2>
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <img src="/path/to/profile-pic.jpg" alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4" />
                <p className="text-gray-700 mb-2">👤 {user.name}</p>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <p className="text-gray-600 mb-4">Reset Password feature coming soon!</p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Account;
