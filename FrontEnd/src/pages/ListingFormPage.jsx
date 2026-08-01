import { useNavigate, useParams } from 'react-router-dom'


const propertyTypes = ['house', 'bungalow', 'castle', 'flat', 'villa', 'apartment', 'cabin', 'penthouse']
const amenities = ['Wifi', 'Kitchen', 'Air conditioning', 'Parking', 'Pool', 'Workspace', 'Washer', 'Breakfast', 'Garden', 'Gym']
const availabilityPresets = ['Instant book', 'Manual approval', 'Flexible cancelation']

export default function ListingFormPage({ mode = 'create' }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isHost = true // Replace with actual logic to determine if the user is a host
  const title = mode === 'create' ? 'Create a new listing' : 'Edit listing'

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">{isHost ? 'Host dashboard' : 'Listing studio'}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
          </div>
          <button type="button" onClick={() => navigate(isHost ? '/host/dashboard' : '/listings')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
            Back
          </button>
        </div>

        {mode === 'edit' && id ? <p className="mt-4 text-sm text-slate-500">Editing listing ID: {id}</p> : null}

        <form className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Enter title" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Property type</span>
            <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400">
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Guest count</span>
            <input type="number" min="1" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="4" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Bedrooms</span>
            <input type="number" min="0" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="2" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Bathrooms</span>
            <input type="number" min="0" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="2" />
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
            <span className="text-sm font-medium text-slate-700">Photos</span>
            <input type="file" multiple className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Destination</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="City or area" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Address</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Street, area, pin code" />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Country</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Country" />
          </label>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Map link</span>
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Google Maps embed URL" />
          </label>

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-slate-700">Amenities</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-slate-700">Availability</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.16em] text-slate-500">Start date</span>
                <input type="date" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" />
              </label>
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.16em] text-slate-500">End date</span>
                <input type="date" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" />
              </label>
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.16em] text-slate-500">Booking style</span>
                <select className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400">
                  {availabilityPresets.map((preset) => (
                    <option key={preset} value={preset}>
                      {preset}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">House rules / notes</span>
            <textarea rows="4" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400" placeholder="Add check-in rules, pet policy, and anything guests should know" />
          </label>

          <button type="button" className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white md:col-span-2">
            {mode === 'create' ? 'Create listing' : 'Update listing'}
          </button>
        </form>
      </div>
    </div>
  )
}