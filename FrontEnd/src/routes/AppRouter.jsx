import { Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import ListingDetailsPage from '../pages/ListingDetailsPage'
import ListingFormPage from '../pages/ListingFormPage'
import ListingsPage from '../pages/ListingsPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="listings/new" element={<ListingFormPage mode="create" />} />
        <Route path="listings/:id" element={<ListingDetailsPage />} />
        <Route path="listings/:id/edit" element={<ListingFormPage mode="edit" />} />
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="signup" element={<AuthPage mode="signup" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}