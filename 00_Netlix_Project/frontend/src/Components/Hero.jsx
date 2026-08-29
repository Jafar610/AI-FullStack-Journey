import { useState, useEffect } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import axios from "axios";
import { requests, API_KEY, BASE_URL } from "../api/tmdb";

function Hero() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.trending);
      setMovies(request.data.results);
    }
    fetchData();
  }, []);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  if (!movie) return null;

  const handlePlay = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`,
      );
      const results = response.data.results || [];
      const youTube = results.filter((item) => item.site === "YouTube");
      const preferred =
        youTube.find((item) => /official trailer/i.test(item.name)) ||
        youTube.find(
          (item) => /trailer/i.test(item.type) || /trailer/i.test(item.name),
        ) ||
        youTube[0] ||
        null;

      if (preferred && preferred.key) {
        window.open(
          `https://www.youtube.com/watch?v=${preferred.key}`,
          "_blank",
        );
      } else {
        const title =
          movie.title || movie.name || movie.original_name || "movie";
        const query = encodeURIComponent(`${title} trailer`);
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          "_blank",
        );
      }
    } catch (error) {
      console.error("Error opening trailer:", error);
      const title = movie.title || movie.name || movie.original_name || "movie";
      const query = encodeURIComponent(`${title} trailer`);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }
  };

  function truncate(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  return (
    <div
      className="h-[60vh] md:h-[80vh] bg-cover bg-center relative flex items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />

      <div className="absolute bottom-6 left-4 md:bottom-10 md:left-10 text-white max-w-[92%] md:max-w-[55%]">
        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-3">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <p className="text-xs sm:text-sm md:text-lg mb-4 max-w-[40rem]">
          {truncate(movie.overview, 150)}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={handlePlay}
            className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#E50914] px-3 sm:px-5 py-1.5 sm:py-2 rounded-md cursor-pointer text-sm sm:text-base"
          >
            <PlayCircleIcon fontSize="small" />
            <span>Play</span>
          </button>

          <Link
            to="/mylist"
            className="flex w-full sm:w-auto items-center justify-center gap-2 border px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-white cursor-pointer hover:bg-[#E50914] hover:text-white hover:border-[#E50914] text-sm sm:text-base"
          >
            <AddCircleIcon fontSize="small" />
            <span>My List</span>
          </Link>

          <Link
            to="/detail"
            state={{ movie }}
            className="flex w-full sm:w-auto items-center justify-center gap-2 border px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-white cursor-pointer hover:bg-[#E50914] hover:text-white hover:border-[#E50914] text-sm sm:text-base"
          >
            <InfoIcon fontSize="small" />
            <span>Detail</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
