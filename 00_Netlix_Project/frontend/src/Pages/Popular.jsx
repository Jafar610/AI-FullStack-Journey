import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { requests } from "../api/tmdb";

function Popular() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const res = await axios.get(requests.popular);
        setMovies(res.data.results || []);
      } catch (err) {
        console.error("Popular fetch error:", err);
        setError("Unable to load popular movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  const openDetail = (movie) => {
    navigate("/detail", { state: { movie } });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-4">Popular Movies</h1>
        <p className="text-gray-300 mb-8 max-w-2xl">Browse popular movies right now.</p>

        {loading ? (
          <div className="text-center text-xl text-gray-300">Loading popular movies...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-400">{error}</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {movies.slice(0, 25).map((movie) => (
              <button
                key={movie.id}
                onClick={() => openDetail(movie)}
                className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-[#181818] text-left shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title || movie.original_title}
                  className="h-[360px] w-full object-cover"
                />
                <div className="flex-1 p-4">
                  <h2 className="text-lg font-semibold text-white overflow-hidden text-ellipsis">
                    {movie.title || movie.original_title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {movie.release_date || "Unknown release date"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Popular;


