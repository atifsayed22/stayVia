import { Link, NavLink } from "react-router-dom";

export default function DesktopNav({ getNavLinkClass }) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      <NavLink to="/" className={getNavLinkClass} end>
        Home
      </NavLink>

      <NavLink to="/listings" className={getNavLinkClass}>
        Listings
      </NavLink>

      <Link
        to="/host"
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Become a Host
      </Link>
    </nav>
  );
}