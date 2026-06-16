import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopular, searchFilms } from './store/slices/filmsSlice';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.films);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchPopular());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      dispatch(searchFilms(value));
    } else if (value.length === 0) {
      dispatch(fetchPopular());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-yellow-400 mb-4">
            Film App
          </h1>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Rechercher un film ou une serie..."
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && (
          <p className="text-center text-gray-400 text-xl">Chargement...</p>
        )}
        {error && (
          <p className="text-center text-red-400 text-xl">{error}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((film) => (
            <div key={film.id} className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform">
              {film.poster_path ? (
                <img
                  src={"https://image.tmdb.org/t/p/w300" + film.poster_path}
                  alt={film.title || film.name}
                  className="w-full"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                  Pas d image
                </div>
              )}
              <div className="p-2">
                <p className="text-sm font-semibold truncate">{film.title || film.name}</p>
                <p className="text-xs text-yellow-400">Note: {film.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;