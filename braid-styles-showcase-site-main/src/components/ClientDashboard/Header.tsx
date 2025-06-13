import { CogIcon, UserIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  username: string;
}

const Header = ({ username }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-[#b36f34]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" />
          </svg>
          <h1 className="ml-2 text-xl font-bold text-[#b36f34]">BraidArt Client Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-amber-100">
            <CogIcon className="h-5 w-5 text-[#b36f34]" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#f8e8d8] flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-[#b36f34]" />
            </div>
            <span className="text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
