import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function UserMenu({ isHost = false }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // User is NOT logged in
  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link
          to="/login"
          className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // User IS logged in
  return (
    <div className="relative hidden md:block">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 font-semibold uppercase text-rose-600">
          {user?.username?.slice(0, 2)}
        </div>

        <span className="text-sm font-medium text-slate-700">
          @{user?.username}
        </span>

        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-4">
            <p className="font-semibold text-slate-900">
              @{user?.username}
            </p>
            <p className="text-sm text-slate-500">
              Welcome back!
            </p>
          </div>

          <nav className="flex flex-col py-2">
            {isHost ? (
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm hover:bg-slate-100"
              >
                Switch to traveler
              </Link>
            ) : (
              <Link
                to="/host"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm hover:bg-slate-100"
              >
                Switch to hosting
              </Link>
            )}

            <Link
              to="/bookings"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm hover:bg-slate-100"
            >
              My bookings
            </Link>
          </nav>

          <div className="border-t border-slate-100 p-2">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}