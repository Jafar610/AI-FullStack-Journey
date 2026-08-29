import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Netflix_logo.png";
import profile from "../assets/Netflix-avatar.png";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const inputRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Tv Show", to: "/tv" },
    { label: "Popular & News", to: "/popular" },
    { label: "My List", to: "/mylist" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#111] text-white w-full max-w-full px-4 py-3 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Netflix logo" className="h-8 w-auto" />
          </Link>

          <ul className="hidden min-w-0 items-center gap-5 text-gray-100 sm:flex">
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-medium hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop/large: inline search input shown when toggled */}
          <div className="hidden sm:flex items-center gap-2">
            {showSearch && (
              <div className="flex items-center bg-[#222] rounded-md px-2 py-1">
                <input
                  ref={inputRef}
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="w-36 md:w-56 lg:w-72 text-sm rounded-md bg-transparent px-2 py-1 text-white outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30"
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowSearch((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            >
              <SearchIcon />
            </button>
          </div>

          <div
            className="relative hidden items-center gap-2 sm:flex"
            ref={profileRef}
          >
            <button
              type="button"
              onClick={() => setShowProfileMenu((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            >
              <img
                src={profile}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <ArrowDropDownIcon className="text-white" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-md border border-white/10 bg-[#111] shadow-lg z-50">
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-white hover:bg-white/10"
                  onClick={() => {
                    setShowProfileMenu(false);
                    // Put logout logic here if needed
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E50914] sm:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mt-3 space-y-3 rounded-md bg-[#111] p-4 shadow-sm sm:hidden">
          <div className="rounded-md border border-white/10 bg-[#222] p-2">
            <input
              ref={inputRef}
              type="text"
              name="search"
              placeholder="Search..."
              className="w-full rounded-md border border-white/10 bg-[#222] px-3 py-2 text-white outline-none focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/30"
            />
          </div>

          <div className="space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-100 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 pt-3">
            <img src={profile} alt="Profile" className="h-8 w-8 rounded-full" />
            <ArrowDropDownIcon className="text-white" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
