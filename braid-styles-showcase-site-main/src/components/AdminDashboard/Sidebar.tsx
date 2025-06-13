import {
  CalendarIcon,
  ChartBarIcon,
  BookmarkIcon,
  VideoCameraIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4">
      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'dashboard' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ChartBarIcon className="h-5 w-5 mr-3" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'appointments' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <CalendarIcon className="h-5 w-5 mr-3" />
          Appointments
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'saved' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BookmarkIcon className="h-5 w-5 mr-3" />
          Saved Styles
        </button>
        <button
          onClick={() => setActiveTab('tutorials')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'tutorials' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <VideoCameraIcon className="h-5 w-5 mr-3" />
          Tutorials
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'community' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <UserGroupIcon className="h-5 w-5 mr-3" />
          Community
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'products' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ShoppingBagIcon className="h-5 w-5 mr-3" />
          Products
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
            activeTab === 'accounts' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <UserCircleIcon className="h-5 w-5 mr-3" />
          Manage Accounts
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
