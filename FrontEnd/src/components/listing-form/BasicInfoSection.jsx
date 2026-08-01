export default function BasicInfoSection({
  formData,
  handleChange,
}) {
  return (
    <section className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">
        Basic Information
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Tell guests about your place.
      </p>

      <div className="mt-8 space-y-6">

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Modern Apartment in Mumbai"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Price per Night (₹)
          </label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="2500"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>

      </div>
    </section>
  );
}