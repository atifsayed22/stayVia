import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <svg
        className="h-7 w-7 text-rose-500 transition-transform duration-200 group-hover:scale-105"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>

      <span className="text-xl font-bold tracking-tight text-slate-900">
        stay<span className="text-rose-500">via</span>
      </span>
    </Link>
  );
}