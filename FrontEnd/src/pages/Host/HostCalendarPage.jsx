import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CircleAlert, Lock, Unlock } from "lucide-react";
import listingService from "../../services/listingService";
import {
  blockHostDate,
  getHostBlockedDates,
  getHostBookings,
  unblockHostDate,
} from "../../services/bookingService";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const startOfDay = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const dateKey = (value) => {
  const date = startOfDay(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const blockedListingId = (blockedDate) =>
  typeof blockedDate.listing === "string"
    ? blockedDate.listing
    : blockedDate.listing?._id;

const blockedDateKey = (blockedDate) => dateKey(blockedDate.date);

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const monthLabel = (value) =>
  value.toLocaleDateString(undefined, { month: "long", year: "numeric" });

const getCalendarDays = (month) => {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayIndex = (firstDay.getDay() + 6) % 7;
  const firstCell = new Date(
    month.getFullYear(),
    month.getMonth(),
    1 - mondayIndex,
  );

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(firstCell);
    day.setDate(firstCell.getDate() + index);
    return day;
  });
};

const isBookingOnDay = (booking, day) => {
  const checkIn = startOfDay(booking.checkIn);
  const checkOut = startOfDay(booking.checkOut);
  const currentDay = startOfDay(day);

  return currentDay >= checkIn && currentDay < checkOut;
};

export default function HostCalendarPage() {
  const [bookings, setBookings] = useState([]);
  const [hostListings, setHostListings] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [listingFilter, setListingFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingDate, setSavingDate] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([getHostBookings(), getHostBlockedDates(), listingService.getMyListings()])
      .then(([bookingData, blockedDateData, listingData]) => {
        if (!active) return;
        setBookings(bookingData || []);
        setBlockedDates(blockedDateData || []);
        setHostListings(listingData?.listings || []);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Failed to load your calendar.",
          );
        }

        
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const listings = useMemo(() => {
    const uniqueListings = new Map(hostListings.map((listing) => [listing._id, listing.title]));
    bookings.forEach((booking) => {
      if (booking.listing?._id) {
        uniqueListings.set(booking.listing._id, booking.listing.title);
      }
    });
    return [...uniqueListings.entries()];
  }, [bookings, hostListings]);

  const filteredBlockedDates = useMemo(
    () => blockedDates.filter(
      (blockedDate) =>
        listingFilter === "all" || blockedListingId(blockedDate) === listingFilter,
    ),
    [blockedDates, listingFilter],
  );

  const blockedDateByKey = useMemo(
    () => new Map(filteredBlockedDates.map((blockedDate) => [
      `${blockedListingId(blockedDate)}-${blockedDateKey(blockedDate)}`,
      blockedDate,
    ])),
    [filteredBlockedDates],
  );

  const filteredBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          listingFilter === "all" || booking.listing?._id === listingFilter,
      ),
    [bookings, listingFilter],
  );

  const calendarDays = useMemo(() => getCalendarDays(month), [month]);
  const upcomingBookings = useMemo(
    () =>
      [...filteredBookings]
        .filter((booking) => startOfDay(booking.checkOut) >= startOfDay(new Date()))
        .sort((first, second) => new Date(first.checkIn) - new Date(second.checkIn))
        .slice(0, 5),
    [filteredBookings],
  );

  const changeMonth = (amount) => {
    setMonth((currentMonth) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + amount, 1),
    );
    setSelectedBooking(null);
  };

  const handleDateToggle = async (day) => {
    if (listingFilter === "all") {
      setError("Choose a listing before blocking a date.");
      return;
    }

    const key = `${listingFilter}-${dateKey(day)}`;
    const existingBlockedDate = blockedDateByKey.get(key);
    setSavingDate(key);
    setError("");

    try {
      if (existingBlockedDate) {
        await unblockHostDate(existingBlockedDate._id);
        setBlockedDates((current) => current.filter((item) => item._id !== existingBlockedDate._id));
      } else {
        const blockedDate = await blockHostDate(listingFilter, dateKey(day));
        setBlockedDates((current) => [
          ...current,
          {
            ...blockedDate,
            listing: blockedListingId(blockedDate),
          },
        ]);
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to update this date.",
      );
    } finally {
      setSavingDate("");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-500">
            Host calendar
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Keep every stay in view.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review reservations and block dates you want to keep unavailable.
          </p>
        </div>
        <label className="text-sm font-medium text-slate-700">
          Listing
          <select
            value={listingFilter}
            onChange={(event) => setListingFilter(event.target.value)}
            className="mt-2 block min-w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          >
            <option value="all">All listings</option>
            {listings.map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </label>
      </header>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <CircleAlert size={18} />
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900">{monthLabel(month)}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {loading ? (
            <p className="px-6 py-10 text-sm text-slate-500">Loading calendar...</p>
          ) : (
            <div className="min-w-[42rem]">
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="px-2 py-3">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((day) => {
                  const dayBookings = filteredBookings.filter((booking) =>
                    isBookingOnDay(booking, day),
                  );
                  const isCurrentMonth = day.getMonth() === month.getMonth();
                  const isToday = dateKey(day) === dateKey(new Date());
                  const blockedDate = blockedDateByKey.get(
                    `${listingFilter}-${dateKey(day)}`,
                  );
                  const isBlocked = Boolean(blockedDate);
                  const dateActionKey = `${listingFilter}-${dateKey(day)}`;

                  return (
                    <div
                      key={dateKey(day)}
                      className={`min-h-28 border-b border-r border-slate-100 p-2 ${isBlocked ? "bg-amber-50" : isCurrentMonth ? "bg-white" : "bg-slate-50/70"}`}
                    >
                      <div className={`mb-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isToday ? "bg-rose-500 text-white" : isCurrentMonth ? "text-slate-700" : "text-slate-300"}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {isBlocked && (
                          <button
                            type="button"
                            onClick={() => handleDateToggle(day)}
                            disabled={savingDate === dateActionKey}
                            className="flex w-full items-center gap-1 truncate rounded-md bg-amber-100 px-2 py-1 text-left text-[11px] font-semibold text-amber-800 transition hover:bg-amber-200 disabled:cursor-wait disabled:opacity-60"
                            title="Click to unblock this date"
                          >
                            <Lock size={12} /> {savingDate === dateActionKey ? "Saving..." : "Blocked"}
                          </button>
                        )}
                        {dayBookings.map((booking) => (
                          <button
                            type="button"
                            key={`${dateKey(day)}-${booking._id}`}
                            onClick={() => setSelectedBooking(booking)}
                            className="block w-full truncate rounded-md bg-rose-50 px-2 py-1 text-left text-[11px] font-semibold text-rose-700 transition hover:bg-rose-100"
                            title={`${booking.guest?.username || "Guest"} · ${booking.listing?.title || "Listing"}`}
                          >
                            {booking.guest?.username || "Guest"}
                          </button>
                        ))}
                        {!isBlocked && dayBookings.length === 0 && listingFilter !== "all" && isCurrentMonth && (
                          <button
                            type="button"
                            onClick={() => handleDateToggle(day)}
                            disabled={savingDate === dateActionKey}
                            className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-[11px] font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-wait disabled:opacity-60"
                            title="Block this date"
                          >
                            <Unlock size={12} /> {savingDate === dateActionKey ? "Saving..." : "Block date"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <aside className="rounded-[2rem] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming stays</h2>
          <p className="mt-1 text-sm text-slate-500">Your next five confirmed reservations.</p>

          <div className="mt-5 space-y-3">
            {upcomingBookings.length === 0 && !loading && (
              <p className="rounded-xl bg-slate-50 px-3 py-4 text-sm text-slate-500">
                No upcoming stays for this filter.
              </p>
            )}
            {upcomingBookings.map((booking) => (
              <button
                type="button"
                key={booking._id}
                onClick={() => {
                  setSelectedBooking(booking);
                  setMonth(new Date(new Date(booking.checkIn).getFullYear(), new Date(booking.checkIn).getMonth(), 1));
                }}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${selectedBooking?._id === booking._id ? "border-rose-300 bg-rose-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}
              >
                <p className="truncate text-sm font-semibold text-slate-900">
                  {booking.listing?.title || "Listing unavailable"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                </p>
                <p className="mt-2 text-xs font-medium text-slate-700">
                  {booking.guest?.username || "Guest"} · {booking.guests} guests
                </p>
              </button>
            ))}
          </div>

          {selectedBooking && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-500">Selected booking</p>
              <h3 className="mt-2 font-semibold text-slate-900">
                {selectedBooking.guest?.username || "Guest"}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{selectedBooking.guest?.email}</p>
              <p className="mt-3 text-sm text-slate-700">
                {formatDate(selectedBooking.checkIn)} - {formatDate(selectedBooking.checkOut)}
              </p>
              <p className="mt-1 text-sm text-slate-500">{selectedBooking.listing?.title}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}