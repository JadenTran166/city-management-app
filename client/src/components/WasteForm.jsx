import { useState } from "react";
import { createWasteData } from "../utils/api";

const WasteForm = () => {
  const [frequency, setFrequency] = useState("");
  const [recyclingRate, setRecyclingRate] = useState("");
  const [wasteType, setWasteType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createWasteData({
        collectionFrequency: frequency,
        recyclingRate,
        wasteType,
      });
      alert("Waste data created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating waste data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Waste Management</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Collection Frequency</label>
        <input
          type="text"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Recycling Rate (%)</label>
        <input
          type="number"
          value={recyclingRate}
          onChange={(e) => setRecyclingRate(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Waste Type</label>
        <input
          type="text"
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default WasteForm;
