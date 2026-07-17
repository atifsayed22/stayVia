import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-slate-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}