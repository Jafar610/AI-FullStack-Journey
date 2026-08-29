import React, { useState } from "react";
import banner from "../assets/banner.png";
import netflixLogo from "../assets/Netflix_logo.png";

function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${banner})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">
        <header className="flex items-center justify-between">
          <img
            src={netflixLogo}
            alt="Netflix logo"
            className="h-10 w-auto object-contain"
          />
          <button className="rounded bg-red-600 px-5 py-2 text-sm font-semibold transition hover:bg-red-700">
            Sign In
          </button>
        </header>

        <main className="flex min-h-[80vh] items-center justify-center">
          <div className="w-full max-w-xl space-y-8 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">
              Unlimited movies, TV shows, and more.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
              Watch anywhere. Cancel anytime. Ready to watch? Enter your email
              to create or restart your membership.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="min-w-0 flex-1 rounded border border-white/20 bg-black/50 px-4 py-4 text-base text-white placeholder:text-gray-300 focus:border-red-600 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded bg-red-600 px-6 py-4 text-base font-semibold transition hover:bg-red-700"
              >
                Get Started
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
