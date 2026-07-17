import { useNavigate, useParams } from 'react-router-dom'

export default function ListingFormPage({ mode = 'create' }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const title = mode === 'create' ? 'Create a new listing' : 'Edit listing'

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">Host dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
          </div>
          <button type="button" onClick={() => navigate('/listings')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
            Back
          </button>
        </div>

        {mode === 'edit' && id ? <p className="mt-4 text-sm text-slate-500">Editing listing ID: {id}</p> : null}

        <form className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Enter title" />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea rows="5" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Describe the experience" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Price</span>
            <input type="number" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="5000" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Image</span>
            <input type="file" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Location</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="City or area" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Country</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Country" />
          </label>

          <button type="button" className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white md:col-span-2">
            {mode === 'create' ? 'Create listing' : 'Update listing'}
          </button>
        </form>
      </div>
    </div>
  )
}