import { useState } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  username: string;
  onLogout: () => void;
  onEditProfile: () => void;
}

const Header = ({ username, onLogout, onEditProfile }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-[#b36f34]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" />
          </svg>
          <h1 className="ml-2 text-xl font-bold text-[#b36f34]">BraidArt Client Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4 relative">
          <button
            className="p-2 rounded-full hover:bg-amber-100"
            onClick={toggleDropdown}
          >
            <CogIcon className="h-5 w-5 text-[#b36f34]" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 w-full text-left"
                onClick={onEditProfile}
              >
                Edit Profile
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-100 w-full text-left"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#f8e8d8] flex items-center justify-center">
            <img src="/images/img11.jpg" alt="User profile" className="h-8 w-8 rounded-full" />
            </div>
            <span className="text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
