import {
    CalendarIcon,
    ChartBarIcon,
    HeartIcon,
    VideoCameraIcon,
    ShoppingBagIcon,
    PlusIcon
  } from '@heroicons/react/24/outline';
  
  interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    return (
      <aside className="w-full lg:w-56">
        <nav className="space-y-1 bg-white rounded-lg shadow p-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${
              activeTab === 'overview' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <ChartBarIcon className="h-5 w-5 mr-3" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${
              activeTab === 'appointments' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <CalendarIcon className="h-5 w-5 mr-3" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${
              activeTab === 'favorites' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <HeartIcon className="h-5 w-5 mr-3" />
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('tutorials')}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${
              activeTab === 'tutorials' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <VideoCameraIcon className="h-5 w-5 mr-3" />
            Tutorials
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full ${
              activeTab === 'products' ? 'bg-[#f8e8d8] text-[#b36f34]' : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <ShoppingBagIcon className="h-5 w-5 mr-3" />
            Products
          </button>
        </nav>
  
        {/* Quick Actions */}
        <div className="mt-4 bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Quick Actions
          </h3>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#b36f34] hover:bg-[#9e5f2d]">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  