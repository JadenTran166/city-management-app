import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  // const { user } = useContext(AuthContext);
  const user = {
    name: "jaden",
    role: "manager",
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow bg-gray-100">
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/dashboard/*"
            element={user ? <Dashboard /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/admin"
            element={
              user?.role === "manager" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/dashboard/analysis" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
