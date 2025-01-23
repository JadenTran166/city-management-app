import { useState } from 'react';
import DataInputForm from '../components/DataInputForm';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('water');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="flex space-x-4 mb-6">
        {['water', 'electricity', 'waste'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Data
          </button>
        ))}
      </div>
      <DataInputForm moduleType={activeTab} />
    </div>
  );
};

export default AdminPanel;
