import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Dynamic links based on login state and role
  const links = [
    { title: 'Home', link: '/' },
    { title: 'All Books', link: '/all-books' },
    ...(isLoggedIn ? [{ title: 'Cart', link: '/cart' }] : []),
    ...(isLoggedIn && role === 'user' ? [{ title: 'Profile', link: '/profile' }] : []),
    ...(isLoggedIn && role === 'admin' ? [{ title: 'Admin Profile', link: '/profile' }] : []),
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        style={{ backgroundColor: 'pink' }}
        className="z-50 relative flex items-center justify-between px-4 py-2"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold">
          <h1><i className="fa-solid fa-book"> </i>bookStore</h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 text-white">
          {links.map((item, index) => (
            <Link
              to={item.link}
              className={`hover:text-blue-500 transition-all duration-300 text-white no-underline ${
                item.title.includes('Profile') ? 'border border-blue-500' : ''
              }`}
              key={index}
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/LogIn"
                className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 no-underline text-white"
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 no-underline"
              >
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden text-xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center text-white">
          {links.map((item, index) => (
            <Link
              to={item.link}
              className="mb-4 text-xl hover:text-blue-500 transition-all duration-300 no-underline text-white"
              key={index}
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/LogIn"
                className="mb-4 px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 no-underline text-white"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 no-underline text-white"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
