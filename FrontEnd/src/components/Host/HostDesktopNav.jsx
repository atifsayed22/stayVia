import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/host",
  },
  {
    label: "My Listings",
    path: "/host/listings",
  },
  {
    label: "Bookings",
    path: "/host/bookings",
  },
  {
    label: "Calendar",
    path: "/host/calendar",
  },
];

export default function HostDesktopNav() {
  const getNavClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <nav className="hidden md:flex items-center gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/host"}
          className={getNavClass}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}