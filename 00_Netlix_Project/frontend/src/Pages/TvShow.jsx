import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { requests } from "../api/tmdb";

function TvShow() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get(requests.originals);
        setTvShows(response.data.results || []);
      } catch (err) {
        setError("Unable to load TV shows. Please try again later.");
        console.error("TvShow fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  const handleCardClick = (show) => {
    navigate("/detail", { state: { movie: show } });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-4">Netflix TV Shows</h1>
        <p className="text-gray-300 mb-8 max-w-2xl">
          Discover the latest Netflix originals and trending TV series from TMDB.
        </p>

        {loading ? (
          <div className="text-center text-xl text-gray-300">Loading TV shows...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-400">{error}</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {tvShows.slice(0, 15).map((show) => (
              <button
                key={show.id}
                onClick={() => handleCardClick(show)}
                className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-[#181818] text-left shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={show.name || show.original_name}
                  className="h-[360px] w-full object-cover"
                />
                <div className="flex-1 p-4">
                  <h2 className="text-lg font-semibold text-white overflow-hidden text-ellipsis">
                    {show.name || show.original_name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {show.first_air_date || "Unknown air date"}
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

export default TvShow;