import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, dbUser, signOut } = useAuth();
  const isHomePage = location.pathname === '/';

  const handleClick = (e, targetId) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.querySelector(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-nav border-b border-gray-200">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="GradToPro Logo" className="w-full h-full object-cover" />
          </div>
          <div className="text-2xl font-black tracking-tight" data-purpose="logo">
            Grad<span className="text-primary">ToPro</span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center space-x-8 font-medium text-sm">
          <a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleClick(e, '#about')}>About</a>
          <a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleClick(e, '#certifications')}>Certifications</a>
          <a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleClick(e, '#training')}>Training Programs</a>
          <a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleClick(e, '#interviews')}>Interviews</a>
          <a className="hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleClick(e, '#placement')}>Placement</a>
          <Link to="/courses" className="hover:text-primary transition-colors cursor-pointer">Courses</Link>
          <Link to="/webinars" className="hover:text-primary transition-colors cursor-pointer">Webinars</Link>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="text-sm font-medium">{dbUser?.name || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition-all active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-primary text-secondary px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition-all active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
