import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Mylist() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("mylist") || "[]");
      setList(stored);
    } catch (e) {
      setList([]);
    }

    const onStorage = (e) => {
      if (e.key === "mylist") {
        try {
          setList(JSON.parse(e.newValue || "[]"));
        } catch (err) {
          setList([]);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const remove = (id) => {
    const next = list.filter((m) => m.id !== id);
    setList(next);
    try {
      localStorage.setItem("mylist", JSON.stringify(next));
    } catch (e) {}
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My List</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.length === 0 && (
            <p className="text-gray-300 col-span-2 sm:col-span-3">
              No movies in your list yet.
            </p>
          )}

          {list.map((movie) => (
            <div key={movie.id}>
              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/detail", { state: { movie } })}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(movie.id);
                  }}
                  aria-label="remove"
                  className="absolute top-2 right-2 p-1 rounded-full bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 sm:w-7 sm:h-7"
                    fill={"currentColor"}
                    style={{ color: "#ef4444" }}
                  >
                    <path d="M12 21s-7.5-4.873-10-8.01C-1.1 8.8 2.5 3 7.5 5.5 9.1 6.5 10 8 12 9.5c2-1.5 2.9-3 4-4 5-2.5 8.6 3.3 5.5 7.49C19.5 16.127 12 21 12 21z" />
                  </svg>
                </button>

                <div className="mt-2">
                  <h2 className="text-sm sm:text-base font-semibold truncate">
                    {movie.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mylist;
