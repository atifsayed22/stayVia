import { categories } from '../../data/siteData'

export default function CategoryRail() {
  return (
    <section className="sticky top-[73px] z-40 border-b border-black/5 bg-[#f7f7f7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <button
            key={category.label}
            type="button"
            className="flex min-w-[92px] flex-col items-center gap-2 rounded-2xl border border-transparent bg-white px-3 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-200 hover:shadow-md"
          >
            <span className="text-xl">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}