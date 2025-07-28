import { Avatar, Badge, IconButton } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchRestaurants } from '../../components/Redux/Restaurant/Action'; 
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import './navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const results = useSelector((store) => store.restaurant?.search || []);
  const loading=useSelector(store=>store.restaurant.loading)


  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  const handleAvatarClick = () => {
    if (auth.user?.role === 'ROLE_CUSTOMER') {
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

    return () => clearTimeout(debounceTimer.current);``
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

  return (
    <div className='px-5 sticky top-0 z-[50] py-[.8rem] bg-[#e91e63] lg:px-20 flex items-center justify-between'>
      {/* Left - Logo */}
      <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
        <li onClick={() => navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
          Vikas Foods
        </li>
      </div>

      {/* Center - Search Field */}
      <div className="flex-1 flex justify-center relative" ref={searchRef}>
        {showSearch && (
          <div className="w-full max-w-md relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-black border px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setQuery('');
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Dropdown Results */}
            {loading && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full p-3 text-gray-500">
                Searching...
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="absolute mt-2 bg-gray-950 border rounded-lg shadow-lg w-full max-h-72 overflow-y-auto z-50">
                <ul>
                  {results.map((r) => (
                    <li
                      key={r.id}
                      onClick={()=>navigate(`restaurant/${r.name}/${r.id}`)}
                      className="flex items-center justify-between hover:bg-gray-600 gap-3 p-3  cursor-pointer border-b last:border-none"
                    >
                      <div className="flex items-center gap-3">
                        <img src={r.images[0]} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold">{r.name}</p>
                          <p className="text-sm text-gray-600">{r.cuisineType}</p>
                        </div>
                      </div>
                      <ArrowOutwardIcon sx={{ fontSize: "1rem", color: "gray" }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full p-3 text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right - Icons */}
      <div className='flex items-center space-x-4'>
        <IconButton onClick={() => setShowSearch(true)}>
          <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
        </IconButton>

        {/* Avatar / Login */}
        <div className='cursor-pointer'>
          {auth.user && auth.user.fullname ? (
            <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: "pink.A400" }}>
              {auth.user.fullname.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <PersonIcon sx={{ color: "white" }} />
            </IconButton>
          )}
        </div>

        {/* Cart */}
        <IconButton onClick={() => navigate('/cart')}>
          <Badge color='primary' badgeContent={cart?.items?.length || 0}>
            <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
