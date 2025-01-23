import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 w-64 h-screen p-4">
      <nav className="space-y-4">
        <Link to="/dashboard" className="block text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/admin" className="block text-blue-600 hover:underline">
          Admin Panel
        </Link>
        <Link to="/analytics" className="block text-blue-600 hover:underline">
          Data Analysis
        </Link>
        <Link to="/input" className="block text-blue-600 hover:underline">
          Data Input
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
