import { useState } from "react";

import Logo from "../Header/Logo";
import DesktopNav from "../Header/DesktopNav";
import UserMenu from "../Header/UserMenu";
import MobileMenu from "../Header/MobileMenu";

import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-rose-500 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="hidden rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-rose-600 sm:inline-flex">
            Traveler
          </span>
        </div>

        <DesktopNav
          getNavLinkClass={getNavLinkClass}
          isAuthenticated={isAuthenticated}
        />

        <UserMenu />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-50 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        getNavLinkClass={getNavLinkClass}
        logout={logout}
      />
    </header>
  );
}
