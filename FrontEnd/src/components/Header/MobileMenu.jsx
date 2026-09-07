import { Link, NavLink } from "react-router-dom";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  isAuthenticated,
  user,
  getNavLinkClass,
  logout,
}) {
  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-inner md:hidden">
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={getNavLinkClass}
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/listings"
          className={getNavLinkClass}
          onClick={() => setIsOpen(false)}
        >
          Listings
        </NavLink>

      </nav>

      <div className="mt-6 border-t border-slate-100 pt-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold uppercase text-slate-700">
                {user?.username?.substring(0, 2) || "GU"}
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  @{user?.username}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/host"
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                Switch to hosting
              </Link>

              <Link
                to="/bookings"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
              >
                My bookings
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}