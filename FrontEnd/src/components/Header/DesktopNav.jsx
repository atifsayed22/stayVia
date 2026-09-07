import { NavLink } from "react-router-dom";

export default function DesktopNav({ getNavLinkClass, isAuthenticated }) {
  return (
    <nav className="hidden items-center gap-1 md:flex">
      <NavLink to="/" className={getNavLinkClass} end>
        Home
      </NavLink>

      <NavLink to="/listings" className={getNavLinkClass}>
        Listings
      </NavLink>

      {isAuthenticated && (
        <NavLink to="/bookings" className={getNavLinkClass}>
          My bookings
        </NavLink>
      )}
    </nav>
  );
}