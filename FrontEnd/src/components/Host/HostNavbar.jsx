import { Link } from "react-router-dom";
import Logo from "../Header/Logo";
import UserMenu from "../Header/UserMenu";
import HostDesktopNav from "./HostDesktopNav";

export default function HostNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Logo />

            <span className="text-xs font-semibold bg-slate-900 text-white px-2 py-1 rounded-full">
              HOST
            </span>
          </div>

          <HostDesktopNav />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          <Link
            to="/host/listings/new"
            className="hidden md:inline-flex bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            + Add Listing
          </Link>

          <UserMenu isHost />
        </div>
      </div>
    </header>
  );
}