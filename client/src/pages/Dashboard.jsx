import { Routes, Route, Link } from "react-router-dom";
import WaterForm from "../components/WaterForm";
import ElectricityForm from "../components/ElectricityForm";
import WasteForm from "../components/WasteForm";
import DataAnalysis from "../components/DataAnalysis";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
          <nav className="space-y-2">
            <Link
              to="/dashboard/water"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Water Management
            </Link>
            <Link
              to="/dashboard/electricity"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Electricity Management
            </Link>
            <Link
              to="/dashboard/waste"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Waste Management
            </Link>
            <Link
              to="/dashboard/analysis"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Data Analysis
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="water" element={<WaterForm />} />
            <Route path="electricity" element={<ElectricityForm />} />
            <Route path="waste" element={<WasteForm />} />
            <Route path="analysis" element={<DataAnalysis />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
