import { Link, NavLink } from 'react-router-dom'
import { currentUser } from '../../data/siteData'

const navLinkClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ].join(' ')

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-200">
            S
          </div>
          <div>
            <div className="text-lg leading-none">StayVia</div>
            <div className="text-xs font-medium text-slate-500">Airbnb-style stay marketplace</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/listings" className={navLinkClass}>
            Listings
          </NavLink>
          <NavLink to="/listings/new" className={navLinkClass}>
            Host
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-slate-900">@{currentUser.username}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase tracking-[0.14em] text-slate-500">{currentUser.role}</span>
        </div>
      </div>
    </header>
  )
}