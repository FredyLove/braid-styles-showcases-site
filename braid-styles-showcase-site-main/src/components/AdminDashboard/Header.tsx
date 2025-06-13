import { CogIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  username: string;
  handleLogout: () => void;
}

const Header = ({ username, handleLogout }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#b36f34]">BraidArt Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleLogout}>
            <CogIcon className="h-6 w-6 text-gray-500" />
          </button>
          <div className="flex items-center">
            <img src="/user-avatar.jpg" alt="User profile" className="h-8 w-8 rounded-full" />
            <span className="ml-2 text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
