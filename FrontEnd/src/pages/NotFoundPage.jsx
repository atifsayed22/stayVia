import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-500">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-500">The route you are looking for does not exist.</p>
      <Link to="/" className="mt-8 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
        Go home
      </Link>
    </div>
  )
}