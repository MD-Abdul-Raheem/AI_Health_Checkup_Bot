import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium transition-colors hover:text-white/80 ${
      isActive ? 'text-white' : 'text-white/70'
    }`;
  };

  const getMobileLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `block px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
    }`;
  };

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="text-base sm:text-xl font-bold text-white tracking-tight">HealthChat Assist</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={getLinkClass('/')}>HOME</Link>
          <Link to="/chat" className={getLinkClass('/chat')}>CHAT</Link>
          <Link to="/about" className={getLinkClass('/about')}>ABOUT</Link>
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-primary/95 border-t border-white/10">
          <Link to="/" className={getMobileLinkClass('/')} onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link to="/chat" className={getMobileLinkClass('/chat')} onClick={() => setIsMenuOpen(false)}>CHAT</Link>
          <Link to="/about" className={getMobileLinkClass('/about')} onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;