import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { requests } from "../api/tmdb";

function Trending() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(requests.trending);
        setMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const scrollByAmount = 380;
  const slideLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const slideRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#030303] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-red-500">
              Trending
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Trending Now</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={slideLeft}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xl font-semibold text-white transition hover:bg-white/10"
            >
              ‹
            </button>
            <button
              onClick={slideRight}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xl font-semibold text-white transition hover:bg-white/10"
            >
              ›
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-lg text-gray-300">
            Loading trending movies...
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-2 scroll-smooth"
          >
            {movies.map((movie, index) => (
              <article
                key={movie.id}
                className="min-w-[180px] sm:min-w-[220px] lg:min-w-[240px] flex-shrink-0 snap-start"
              >
                <div className="relative overflow-hidden rounded-3xl bg-[#111] shadow-xl shadow-black/40 transition hover:-translate-y-1 hover:shadow-black/50">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/95 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white">
                    N
                  </span>
                  <span className="absolute left-4 bottom-4 text-4xl font-black text-white drop-shadow-lg">
                    {index + 1}
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <h3 className="truncate text-base font-semibold text-white">
                    {movie.title || movie.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>{movie.vote_average?.toFixed(1)} ⭐</span>
                    <span>
                      {movie.release_date || movie.first_air_date || "TBA"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Trending;
