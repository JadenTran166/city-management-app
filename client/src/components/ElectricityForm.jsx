import { useState } from "react";
import { uploadElectricityData } from "../utils/api";

const ElectricityForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(file);
      formData.append("file", file);
      const response = await uploadElectricityData(formData);
      alert("Electricity data uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading electricity data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Electricity Management</h2>
      <p className="text-xs mb-4">
        hint: using client\src\assets\data.csv example to import
      </p>
      <div className="mb-4">
        <label className="block text-gray-700">Upload CSV File</label>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
};

export default ElectricityForm;
