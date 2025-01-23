import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const user = {
    name: "jaden",
    role: "manager",
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <h1 className="text-xl font-bold">
          <Link to="/">City Management App</Link>
        </h1>
      </div>

      <nav className="flex items-center gap-4">
        {user ? (
          <>
            {user.role === "manager" && (
              <>
                <Link to="/admin-panel" className="hover:text-gray-300">
                  Admin Panel
                </Link>
              </>
            )}
            <Link to="/dashboard/analysis" className="hover:text-gray-300">
              Data Analysis
            </Link>
            <Link to="/notifications" className="hover:text-gray-300">
              Notifications
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
