import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export function Header({ isLoggedIn, onSignOut }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    onSignOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-blue-600 font-bold text-xl">EduPathSA</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>

            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </a>

            {isLoggedIn ? (
              <button
                onClick={handleSignOutClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </a>
              <Link to="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                Get Started
              </Link>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              {isLoggedIn ? (
                <button
                  onClick={handleSignOutClick}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
