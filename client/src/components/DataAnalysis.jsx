import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import apiClient from "../utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataAnalysis = () => {
  // const { user } = useContext(AuthContext);

  const [waterData, setWaterData] = useState([]);
  const [electricityData, setElectricityData] = useState([]);
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch data based on user role
      const [waterResponse, electricityResponse, wasteResponse] =
        await Promise.all([
          apiClient.get("/water"),
          apiClient.get("/electricity"),
          apiClient.get("/waste"),
        ]);

      console.log({ waterResponse, electricityResponse, wasteResponse });

      setWaterData(waterResponse.data?.data);
      setElectricityData(electricityResponse.data?.data);
      setWasteData(wasteResponse.data?.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-200 text-gray-500">
        Loading data analysis...
      </div>
    );
  }

  const waterChartData = {
    labels: waterData.map((item) => item.sourceType),
    datasets: [
      {
        label: "Daily Consumption (L)",
        data: waterData.map((item) => item.dailyConsumption),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const electricityChartData = {
    labels: electricityData.map((item) => item.peakHours),
    datasets: [
      {
        label: "Daily Usage (kWh)",
        data: electricityData.map((item) => item.dailyUsage),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  const wasteChartData = {
    labels: wasteData.map((item) => item.wasteType),
    datasets: [
      {
        label: "Recycling Rate (%)",
        data: wasteData.map((item) => item.recyclingRate),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Data Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Water Chart */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-medium mb-2">Water Consumption</h3>
          <Bar data={waterChartData} />
        </div>

        {/* Electricity Chart */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-medium mb-2">Electricity Usage</h3>
          <Bar data={electricityChartData} />
        </div>

        {/* Waste Chart */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-medium mb-2">Waste Recycling</h3>
          <Bar data={wasteChartData} />
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
