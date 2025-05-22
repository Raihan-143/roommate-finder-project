import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Menu, X, Home, Search, Plus, List, LogIn, UserPlus, LogOut, UserCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ThemeToggleButton from './Custom';




const Navbar = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/match.png"
            alt="Roommate Finder Logo"
            className="h-10 w-auto mr-2"
          />
          <span className="text-2xl font-bold text-indigo-700 dark:text-white">
            RoomMate<span className="text-rose-500">Finder</span>
          </span>
        </Link>


        <div className="hidden md:flex flex-1 justify-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          <Link to="/" className="flex items-center gap-1 hover:text-indigo-700 dark:hover:text-blue-400">
            <Home size={18} /> Home
          </Link>
          <Link to="/browse" className="flex items-center gap-1 hover:text-indigo-700 dark:hover:text-blue-400">
            <Search size={18} /> Browse
          </Link>
          {user && (
            <>
              <Link to="/add" className="flex items-center gap-1 hover:text-indigo-700 dark:hover:text-blue-400">
                <Plus size={18} /> Add-Listing
              </Link>
              <Link to="/my-listings" className="flex items-center gap-1 hover:text-indigo-700 dark:hover:text-blue-400">
                <List size={18} /> My Listings
              </Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggleButton></ThemeToggleButton>
      
          {user ? (
            <>
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-700 cursor-pointer"
                title={user.displayName || 'User'}
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg cursor-pointer"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="flex items-center gap-1 bg-indigo-700 hover:bg-blue-600 text-white px-4 py-1 rounded-lg cursor-pointer">
                  <LogIn size={16} /> Login
                </button>
              </Link>
              <Link to="/register">
                <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg cursor-pointer">
                  <UserPlus size={16} /> Register
                </button>
              </Link>
            </>
          )}
        </div>


        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(true)}>
            <Menu size={28} className="text-gray-700 dark:text-gray-100" />
          </button>
        </div>
      </div>


      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}


      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-lg z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X size={24} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="p-4 space-y-4 text-gray-700 dark:text-gray-200 font-medium">
          <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
            <Home size={18} /> Home
          </Link>
          <Link to="/browse" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
            <Search size={18} /> Browse
          </Link>
          {user && (
            <>
              <Link to="/add" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
                <Plus size={18} /> Add
              </Link>
              <Link to="/my-listings" onClick={() => setDrawerOpen(false)} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400">
                <List size={18} /> My Listings
              </Link>
            </>
          )}

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span className="font-semibold">{user.displayName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    <LogIn size={18} /> Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    <UserPlus size={18} /> Register
                  </button>
                </Link>
              </>
            )}
          </div>


          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
