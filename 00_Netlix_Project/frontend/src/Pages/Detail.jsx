import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { API_KEY, BASE_URL } from "../api/tmdb";

const formatMovie = (movie) => {
  if (!movie) return null;

  const title =
    movie.title || movie.name || movie.original_name || "Movie Title";
  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : movie.rating || "N/A";
  const releaseDate =
    movie.release_date || movie.first_air_date || "2024-01-01";
  const year = releaseDate.slice(0, 4);
  const duration = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : movie.duration || "2h 15m";
  const ageRating = movie.adult ? "18+" : movie.ageRating || "16+";
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : movie.image ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlRNrj_ilBOh0nfhXRZLd4mbINGj4qEEeZFQ&s";
  const overview =
    movie.overview ||
    movie.description ||
    "This is an amazing movie with a compelling storyline, great performances, and stunning cinematography. Perfect for anyone who loves this genre. A must-watch film that will keep you entertained from start to finish.";

  return {
    id: movie.id,
    title,
    rating,
    year,
    duration,
    ageRating,
    image,
    overview,
  };
};

function Detail() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [relatedMovies, setRelatedMovies] = useState([]);

  const movieFromState = location.state?.movie;
  const [currentMovie, setCurrentMovie] = useState(
    () => formatMovie(movieFromState) || null,
  );

  const fetchRelatedMovies = async (movie) => {
    if (!movie) {
      setRelatedMovies([]);
      return;
    }

    const genreId = movie.genre_ids?.[0];
    let url = "";

    if (genreId) {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`;
    } else if (movie.id) {
      url = `${BASE_URL}/movie/${movie.id}/similar?api_key=${API_KEY}`;
    }

    if (!url) {
      setRelatedMovies([]);
      return;
    }

    try {
      const response = await axios.get(url);
      const results = response.data.results
        .filter((item) => item.id !== movie.id)
        .slice(0, 5)
        .map(formatMovie);

      setRelatedMovies(results.length ? results : []);
    } catch (error) {
      console.error("Error fetching related movies:", error);
      setRelatedMovies([]);
    }
  };

  const [primaryTrailer, setPrimaryTrailer] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null);

  const fetchDetailInfo = async (movieId) => {
    if (!movieId) {
      setDetailInfo(null);
      return;
    }

    const tryMovieDetails = async () => {
      const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
      const res = await axios.get(url);
      return res.data;
    };

    const tryTvDetails = async () => {
      const url = `${BASE_URL}/tv/${movieId}?api_key=${API_KEY}`;
      const res = await axios.get(url);
      return res.data;
    };

    try {
      let details = null;
      try {
        details = await tryMovieDetails();
      } catch (err) {
        details = await tryTvDetails();
      }
      setDetailInfo(details);
    } catch (error) {
      console.error("Error fetching detail info:", error);
      setDetailInfo(null);
    }
  };

  const fetchVideos = async (movie) => {
    if (!movie || !movie.id) {
      setPrimaryTrailer(null);
      return;
    }

    const tryMovieVideos = async () => {
      const url = `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`;
      const res = await axios.get(url);
      return res.data.results || [];
    };

    const tryTvVideos = async () => {
      const url = `${BASE_URL}/tv/${movie.id}/videos?api_key=${API_KEY}`;
      const res = await axios.get(url);
      return res.data.results || [];
    };

    try {
      let results = [];
      try {
        results = await tryMovieVideos();
      } catch (err) {
        // if movie endpoint fails, try tv endpoint
        try {
          results = await tryTvVideos();
        } catch (err2) {
          results = [];
        }
      }

      const youTube = (results || []).filter((v) => v.site === "YouTube");

      const preferred =
        youTube.find((v) => /official trailer/i.test(v.name)) ||
        youTube.find(
          (v) => /trailer/i.test(v.type) || /trailer/i.test(v.name),
        ) ||
        youTube.find((v) => /teaser/i.test(v.type) || /teaser/i.test(v.name)) ||
        youTube[0] ||
        null;

      setPrimaryTrailer(preferred);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setPrimaryTrailer(null);
    }
  };

  useEffect(() => {
    if (movieFromState) {
      setCurrentMovie(formatMovie(movieFromState));
      fetchRelatedMovies(movieFromState);
      // primary trailer will be fetched when currentMovie is set below
    }
  }, [movieFromState]);

  // Fetch trailer whenever the displayed currentMovie changes
  useEffect(() => {
    if (currentMovie?.id) {
      fetchVideos({ id: currentMovie.id });
      fetchDetailInfo(currentMovie.id);
    } else {
      setPrimaryTrailer(null);
      setDetailInfo(null);
    }
  }, [currentMovie?.id]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="text-gray-300 leading-relaxed mr-4">
            <p>{currentMovie.overview}</p>
          </div>
        );
      case "trailers":
        return (
          <div className="text-gray-300">
            {!primaryTrailer ? (
              <p>No trailer available for this title.</p>
            ) : (
              <div className="bg-gray-900 rounded overflow-hidden max-w-4xl">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    title={primaryTrailer.name}
                    src={`https://www.youtube.com/embed/${primaryTrailer.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3">
                  <p className="text-lg text-white font-semibold truncate">
                    {primaryTrailer.name}
                  </p>
                  <p className="text-sm text-gray-400">{primaryTrailer.type}</p>
                  <a
                    href={`https://www.youtube.com/watch?v=${primaryTrailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-red-500 hover:underline"
                  >
                    Open on YouTube
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      case "morelike":
        return (
          <div className="text-gray-300">
            <p>More movies like this will be displayed here.</p>
          </div>
        );
      case "detailinfo":
        if (!detailInfo) {
          return (
            <div className="text-gray-300">
              <p>Loading detailed movie information...</p>
            </div>
          );
        }

        const genres =
          detailInfo.genres?.map((genre) => genre.name).join(", ") || "N/A";
        const language = detailInfo.original_language
          ? detailInfo.original_language.toUpperCase()
          : detailInfo.spoken_languages?.[0]?.english_name || "N/A";
        const releaseDate =
          detailInfo.release_date || detailInfo.first_air_date || "N/A";
        const runtime = detailInfo.runtime
          ? `${Math.floor(detailInfo.runtime / 60)}h ${detailInfo.runtime % 60}m`
          : Array.isArray(detailInfo.episode_run_time) &&
              detailInfo.episode_run_time.length
            ? `${Math.floor(detailInfo.episode_run_time[0] / 60)}h ${detailInfo.episode_run_time[0] % 60}m`
            : "N/A";
        const budget = detailInfo.budget
          ? `$${detailInfo.budget.toLocaleString()}`
          : "N/A";
        const revenue = detailInfo.revenue
          ? `$${detailInfo.revenue.toLocaleString()}`
          : "N/A";

        return (
          <div className="text-gray-300 space-y-2">
            <p>
              <strong>Title:</strong>{" "}
              {detailInfo.title || detailInfo.name || currentMovie.title}
            </p>
            <p>
              <strong>Overview:</strong>{" "}
              {detailInfo.overview || currentMovie.overview}
            </p>
            <p>
              <strong>Genre:</strong> {genres}
            </p>
            <p>
              <strong>Language:</strong> {language}
            </p>
            <p>
              <strong>Release Date:</strong> {releaseDate}
            </p>
            <p>
              <strong>Runtime:</strong> {runtime}
            </p>
            <p>
              <strong>Budget:</strong> {budget}
            </p>
            <p>
              <strong>Revenue:</strong> {revenue}
            </p>
            {detailInfo.status && (
              <p>
                <strong>Status:</strong> {detailInfo.status}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row gap-8 bg-[#111111] text-white px-4 md:px-10 py-8 overflow-y-auto">
        {/* Image - Left Side */}
        <div className="lg:sticky lg:top-10 flex-shrink-0 flex justify-center items-center h-fit w-full lg:w-[30%]">
          <div className="relative max-w-xl w-full">
            {/* Glow Effect Background */}
            <div className="absolute inset-0 bg-red-600 opacity-30 blur-3xl rounded-2xl transform -z-10"></div>

            {/* Image Container */}
            <img
              src={currentMovie.image}
              alt={currentMovie.title}
              className="w-full h-64 sm:h-80 md:h-[26rem] lg:h-auto rounded-2xl shadow-2xl hover:shadow-red-600/50 transition duration-300 hover:scale-105 border-2 border-gray-700 hover:border-red-600 object-cover"
            />

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg text-xs sm:text-sm">
              <StarIcon className="text-yellow-300 text-sm" />
              <span className="font-bold">{currentMovie.rating}</span>
            </div>
          </div>
        </div>
        {/* Detail Info - Right Side */}
        <div className="flex-1 flex flex-col gap-6 pb-10 w-full">
          {/* Movie title and Rate - Full Width */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">
              {currentMovie.title}
            </h1>
            <div className="flex items-center gap-2 text-lg sm:text-xl">
              <p className="font-semibold">{currentMovie.rating}</p>
              <StarIcon className="text-yellow-400" />
            </div>
          </div>

          {/* Movie date & movie time length */}
          <div>
            <p className="text-sm sm:text-base text-gray-300">
              {currentMovie.year} | {currentMovie.duration} |{" "}
              {currentMovie.ageRating}
            </p>
          </div>

          {/* Navigation  */}
          <div>
            <ul className="flex flex-wrap gap-3 border-b border-gray-700 pb-4">
              <li
                onClick={() => setActiveTab("overview")}
                className={`cursor-pointer pb-2 ${
                  activeTab === "overview"
                    ? "border-b-2 border-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Overview
              </li>
              <li
                onClick={() => setActiveTab("trailers")}
                className={`cursor-pointer pb-2 ${
                  activeTab === "trailers"
                    ? "border-b-2 border-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Trailers & More
              </li>
              <li
                onClick={() => setActiveTab("morelike")}
                className={`cursor-pointer pb-2 ${
                  activeTab === "morelike"
                    ? "border-b-2 border-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                More Like this
              </li>
              <li
                onClick={() => setActiveTab("detailinfo")}
                className={`cursor-pointer pb-2 ${
                  activeTab === "detailinfo"
                    ? "border-b-2 border-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Detail Info
              </li>
            </ul>
          </div>

          {/* Detail Info Content */}
          <div className="text-sm sm:text-base">{renderContent()}</div>

          {/* Related Movies */}
          <div className="mt-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              Related Movies
            </h1>
            {relatedMovies.length === 0 ? (
              <p className="text-gray-400">
                There is no related movie available.
              </p>
            ) : (
              <div
                className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {relatedMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => setCurrentMovie(movie)}
                    className="flex-shrink-0 cursor-pointer transform transition hover:scale-105"
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className={`w-32 sm:w-40 h-44 sm:h-56 rounded-lg object-cover ${
                        currentMovie.id === movie.id
                          ? "ring-4 ring-red-600"
                          : ""
                      }`}
                    />
                    <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-[8rem] truncate">
                      {movie.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
