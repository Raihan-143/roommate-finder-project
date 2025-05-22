import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-700 dark:text-white">
          RoommateFinder
        </Link>

        {/* Center Links (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link to="/browse" className="hover:text-blue-600 dark:hover:text-blue-400">Browse</Link>
          {user && (
            <>
              <Link to="/add" className="hover:text-blue-600 dark:hover:text-blue-400">Add</Link>
              <Link to="/my-listings" className="hover:text-blue-600 dark:hover:text-blue-400">My Listings</Link>
            </>
          )}
        </div>

        {/* Right Side Buttons (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle /> {/* ✅ Dark/Light Toggle */}
          {user ? (
            <>
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                title={user.displayName || 'User'}
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg">Login</button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg">Register</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(true)}>
            <Menu size={28} className="text-gray-700 dark:text-gray-100" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black shadow-lg z-50 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X size={24} className="text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-gray-700 dark:text-gray-200 font-medium">
          <Link to="/" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <Link to="/browse" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Browse</Link>
          {user && (
            <>
              <Link to="/add" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">Add</Link>
              <Link to="/my-listings" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600 dark:hover:text-blue-400">My Listings</Link>
            </>
          )}

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
            {user ? (
              <>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span className="font-semibold">{user.displayName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* ✅ Theme Toggle for Mobile */}
          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
