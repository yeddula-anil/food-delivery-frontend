import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const delayDebounce = setTimeout(() => {
        axios
          .get("http://localhost:8080/api/restaurants/search", {
            params: { query },
          })
          .then((res) => setResults(res.data))
          .catch((err) => console.error(err));
      }, 500); // debounce 500ms

      return () => clearTimeout(delayDebounce);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Search Restaurants</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-4"
        />

        {/* Results */}
        <div className="max-h-64 overflow-y-auto">
          {results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((r) => (
                <li
                  key={r.id}
                  onClick={() => (window.location.href = `/restaurant/${r.id}`)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="text-sm text-gray-600">{r.cuisineType}</p>
                </li>
              ))}
            </ul>
          ) : query ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            <p className="text-gray-400">Start typing to search...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
