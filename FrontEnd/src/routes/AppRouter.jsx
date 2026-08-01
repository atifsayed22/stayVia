import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import HostDashboardPage from "../pages/HostDashboardPage";
import ListingDetailsPage from '../pages/ListingDetailsPage'
import ListingFormPage from "../pages/ListingFormPage";
import ListingsPage from "../pages/ListingsPage";
import NotFoundPage from "../pages/NotFoundPage";
import HostLayout from "../components/layout/HostLayout";
import HostListingsPage from "../pages/Host/HostListingsPage";
import HostBookingsPage from "../pages/Host/HostBookingPage";
import HostCalendarPage from "../pages/Host/HostCalendarPage";
export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        
        <Route path="listings" element={<ListingsPage />} />
        <Route
          path="listings/new"
          element={<ListingFormPage mode="create" />}
        />
        <Route path="listings/:id" element={<ListingDetailsPage />} />
        <Route
          path="listings/:id/edit"
          element={<ListingFormPage mode="edit" />}
        />
        <Route path="login" element={<AuthPage mode="login" />} />
        <Route path="signup" element={<AuthPage mode="signup" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="host" element={<HostLayout />}>
        <Route index element={<HostDashboardPage />} />

        <Route path="listings" element={<HostListingsPage />} />

        <Route
          path="listings/new"
          element={<ListingFormPage mode="create" />}
        />

        <Route
          path="listings/:id/edit"
          element={<ListingFormPage mode="edit" />}
        />

        <Route path="bookings" element={<HostBookingsPage />} />

        <Route path="calendar" element={<HostCalendarPage />} />
      </Route>
    </Routes>
  );
}
