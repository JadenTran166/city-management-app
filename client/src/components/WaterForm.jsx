import { useState } from 'react';
import { createWaterData } from '../utils/api';

const WaterForm = () => {
  const [dailyConsumption, setDailyConsumption] = useState('');
  const [availability, setAvailability] = useState(false);
  const [sourceType, setSourceType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createWaterData({
        dailyConsumption,
        availability,
        sourceType,
      });
      alert('Water data created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating water data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Water Management</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Daily Consumption (liters)</label>
        <input
          type="number"
          value={dailyConsumption}
          onChange={(e) => setDailyConsumption(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Availability</label>
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
          className="mr-2"
        />
        Available
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Source Type</label>
        <input
          type="text"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default WaterForm;
