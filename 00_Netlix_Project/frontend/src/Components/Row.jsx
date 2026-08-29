import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { requests } from "../api/tmdb";
function Row({ title, movies }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("mylist") || "[]");
      return new Set(stored.map((m) => m.id));
    } catch (e) {
      return new Set(e);
    }
  });

  const toggleLike = (movie) => {
    setLiked((prev) => {
      const next = new Set(prev);

      if (prev.has(movie.id)) {
        // Already in list, remove it
        next.delete(movie.id);
      } else {
        // Not in list, add it
        next.add(movie.id);
      }

      // Sync the new state to localStorage
      let list = [];
      try {
        list = JSON.parse(localStorage.getItem("mylist") || "[]");
      } catch (e) {
        list = [];
      }

      if (prev.has(movie.id)) {
        // Removing: filter out this movie
        list = list.filter((m) => m.id !== movie.id);
      } else {
        // Adding: check if already exists before pushing
        if (!list.some((m) => m.id === movie.id)) {
          list.push({
            id: movie.id,
            title: movie.title || movie.name,
            poster_path: movie.poster_path,
          });
        }
      }

      try {
        localStorage.setItem("mylist", JSON.stringify(list));
      } catch (e) {}

      return next;
    });
  };

  return (
    <>
      <div className="flex justify-center items-center bg-[#121212] w-full text-white text-3xl font-bold">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>

          <Swiper
            className="py-4"
            modules={[Autoplay]}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // when window width is >= 320px
              320: { slidesPerView: 1 },
              // >= 480px
              480: { slidesPerView: 2 },
              // >= 640px
              640: { slidesPerView: 3 },
              // >= 1024px
              1024: { slidesPerView: 4 },
              // >= 1280px
              1280: { slidesPerView: 5 },
            }}
          >
            {movies?.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="relative px-1">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-48 sm:h-56 md:h-72 object-cover rounded-lg cursor-pointer"
                    onClick={() => navigate("/detail", { state: { movie } })}
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(movie);
                    }}
                    aria-label={liked.has(movie.id) ? "unlike" : "like"}
                    className="absolute top-2 right-2 z-20 p-1 rounded-full bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 sm:w-7 sm:h-7 transition-colors"
                      fill={
                        liked.has(movie.id) ? "currentColor" : "transparent"
                      }
                      stroke="currentColor"
                      strokeWidth="1"
                      style={{
                        color: liked.has(movie.id) ? "#ef4444" : "#ffffff",
                      }}
                    >
                      <path d="M12 21s-7.5-4.873-10-8.01C-1.1 8.8 2.5 3 7.5 5.5 9.1 6.5 10 8 12 9.5c2-1.5 2.9-3 4-4 5-2.5 8.6 3.3 5.5 7.49C19.5 16.127 12 21 12 21z" />
                    </svg>
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Row;
