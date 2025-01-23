import { useState } from 'react';
import {
  createWaterData,
  uploadElectricityData,
  createWasteData,
} from '../utils/api';

const DataInputForm = ({ moduleType }) => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (moduleType === 'water') {
        await createWaterData(formData);
      } else if (moduleType === 'electricity') {
        const formData = new FormData();
        formData.append('file', file);
        await uploadElectricityData(formData);
      } else if (moduleType === 'waste') {
        await createWasteData(formData);
      }
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add {moduleType} Data</h2>
      {moduleType === 'electricity' ? (
        <div>
          <label htmlFor="file" className="block mb-2">
            Upload CSV File
          </label>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full border rounded"
          />
        </div>
      ) : (
        <>
          <label htmlFor="data" className="block mb-2">
            Enter Data
          </label>
          <input
            type="text"
            id="data"
            name="data"
            value={formData.data || ''}
            onChange={handleChange}
            className="block w-full border rounded"
          />
        </>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default DataInputForm;
