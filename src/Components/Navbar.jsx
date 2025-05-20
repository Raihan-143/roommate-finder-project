import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">RoommateFinder</Link>

        {/* Center Links (only in desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/browse" className="hover:text-blue-600">Browse</Link>
          {user && (
            <>
              <Link to="/add" className="hover:text-blue-600">Add</Link>
              <Link to="/my-listings" className="hover:text-blue-600">My Listings</Link>
            </>
          )}
        </div>

        {/* Right Buttons (desktop only) */}
        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
            >
              Logout
            </button>
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

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(true)}>
            <Menu size={28} />
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
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-3 text-gray-700 font-medium">
          <Link to="/" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600">Home</Link>
          <Link to="/browse" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600">Browse</Link>
          {user && (
            <>
              <Link to="/add" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600">Add</Link>
              <Link to="/my-listings" onClick={() => setDrawerOpen(false)} className="block hover:text-blue-600">My Listings</Link>
            </>
          )}
          <div className="pt-4 border-t">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
