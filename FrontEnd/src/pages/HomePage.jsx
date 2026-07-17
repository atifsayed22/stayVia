import CategoryRail from '../components/home/CategoryRail'
import Hero from '../components/home/Hero'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRail />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Book real stays', 'Guests can reserve listings with pricing, date windows, and booking states later.'],
            ['Host and traveler', 'One account can switch roles, which is closer to a real marketplace model.'],
            ['Ready for payments', 'The UI already has the right surfaces for checkout, approval, and booking confirmation.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[2rem] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}