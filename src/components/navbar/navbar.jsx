import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Badge, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurants } from '../../components/Redux/Restaurant/Action';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileNavigation from '../Profile/ProfileNavigation';
import AdminProfileNavigation from '../../admin/components/Profile/ProfileNavigation';

import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const results = useSelector((store) => store.restaurant?.search || []);
  const loading = useSelector(store => store.restaurant.loading);
  const [customer, setCustomer] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  const handleAvatarClick = () => {
    if (auth.user?.role === 'ROLE_OWNER') {
      setCustomer(false);
      navigate('/admin/my-profile');
    } else {
      navigate('/my-profile');
    }
  };

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (query.trim()) {
      debounceTimer.current = setTimeout(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(searchRestaurants(query, jwt));
      }, 400);
    }

    return () => clearTimeout(debounceTimer.current);
  }, [query, dispatch]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onMenuClick = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="w-full px-0 sm:px-2 md:px-6 lg:px-20 sticky top-0 z-[50] py-2 bg-[#e91e63] flex items-center justify-between relative">
      {/* Left - Logo */}
      <div className="flex items-center gap-1 sm:gap-4 z-30">
        {isSmallScreen && (
          <IconButton onClick={onMenuClick}>
            <MenuIcon sx={{ fontSize: "1.8rem", color: "black" }} />
          </IconButton>
        )}
        <span
          onClick={() => navigate('/')}
          className="logo font-semibold text-gray-800 text-xl cursor-pointer"
        >
          Vikas Foods
        </span>
      </div>

      {/* Center & Right */}
      {!showSearch && (
        <>
          <div className="flex-1" />
          <div className="flex items-center space-x-1 sm:space-x-4 z-30">
            <IconButton onClick={() => setShowSearch(true)}>
              <SearchIcon sx={{ fontSize: '1.5rem', color: 'white' }} />
            </IconButton>

            <div className="cursor-pointer">
              {auth.user && auth.user.fullname ? (
                <Avatar onClick={handleAvatarClick} sx={{ bgcolor: 'white', color: 'pink.A400' }}>
                  {auth.user.fullname.charAt(0).toUpperCase()}
                </Avatar>
              ) : (
                <IconButton onClick={() => navigate('/account/login')}>
                  <PersonIcon sx={{ color: 'white' }} />
                </IconButton>
              )}
            </div>

            {customer && (
              <IconButton onClick={() => navigate('/cart')}>
                <Badge color="primary" badgeContent={cart?.items?.length || 0}>
                  <ShoppingCartIcon sx={{ fontSize: '1.5rem', color: 'white' }} />
                </Badge>
              </IconButton>
            )}
          </div>
        </>
      )}

      {/* Search Input */}
      {showSearch && (
        <div
          ref={searchRef}
          className={`${isSmallScreen 
            ? "absolute top-0 left-0 right-0 min-h-[60px] bg-[#e91e63] flex flex-col px-3 py-2 z-[60]" 
            : "flex-1 flex justify-center relative z-[60]"}`}
        >
          <div className={`${isSmallScreen ? "w-full flex flex-col gap-2 relative" : "w-full max-w-md relative"}`}>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className={`${isSmallScreen 
                  ? "flex-grow bg-black border border-gray-600 px-3 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-pink-400 text-white" 
                  : "w-full bg-black border px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-pink-400 text-white"}`}
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setQuery('');
                }}
                className={`${isSmallScreen 
                  ? "ml-2 text-white text-xl font-bold p-1 hover:text-pink-400" 
                  : "absolute top-2 right-3 text-gray-500 hover:text-gray-700"}`}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            {/* Results dropdown */}
            {query && (
              <>
                {loading && (
                  <div
                    className={`${
                      isSmallScreen
                        ? "mt-2 bg-gray-950 border rounded-lg shadow-lg w-full p-3 text-gray-400"
                        : "absolute mt-2 bg-white border rounded-lg shadow-lg p-3 text-gray-500"
                    }`}
                    style={{ width: "100%" }}
                  >
                    Searching...
                  </div>
                )}

               {!loading && Array.isArray(results) && results.length > 0 && (
                  <div
                    className={`${isSmallScreen
                      ? "mt-2 bg-gray-950 border rounded-lg shadow-lg w-full"
                      : "absolute mt-2 bg-gray-950 border rounded-lg shadow-lg"
                    } hide-scrollbar`}
                    style={{
                      width: "100%",
                      maxHeight: "18rem",
                      overflowY: "auto"
                    }}
                  >
                    <ul>
                      {results.map((r) => (
                        <li
                          key={r.id}
                          onClick={() => {
                            navigate(`restaurant/${r.name}/${r.id}`);
                            setShowSearch(false);
                            setQuery('');
                          }}
                          className="flex items-center justify-between hover:bg-gray-600 gap-3 p-3 cursor-pointer border-b last:border-none"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={r.images && r.images.length > 0 ? r.images[0] : "/fallback.jpg"}
                              alt={r.name || "Restaurant"}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-semibold text-white">{r.name}</p>
                              <p className="text-sm text-gray-400">
                                {r.cuisineType || "Cuisine not available"}
                              </p>
                            </div>
                          </div>
                          <ArrowOutwardIcon sx={{ fontSize: "1rem", color: "gray" }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}


                {!loading && Array.isArray(results) && results.length === 0 && (
                  <div
                    className={`${
                      isSmallScreen
                        ? "mt-2 bg-gray-950 border rounded-lg shadow-lg w-full p-3 text-gray-400"
                        : "absolute mt-2 bg-white border rounded-lg shadow-lg p-3 text-gray-500"
                    }`}
                    style={{ width: "100%" }}
                  >
                    No results found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Drawer */}
      {drawerOpen &&
        (auth.user?.role === 'ROLE_OWNER' ? (
          <AdminProfileNavigation open={drawerOpen} handleClose={() => setDrawerOpen(false)} />
        ) : (
          <ProfileNavigation open={drawerOpen} handleClose={() => setDrawerOpen(false)} />
        ))}
    </div>
  );
};

export default Navbar;
