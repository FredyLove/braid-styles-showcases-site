import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Booking = {
  id: number;
  service_type: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  notes?: string;
};

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-blue-100 text-blue-800",
  Rejected: "bg-red-100 text-red-800",
  Completed: "bg-green-100 text-green-800",
};

const UserBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleReschedule = async (bookingId: number) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (e.g. 2:00 PM):");

    if (!newDate || !newTime) {
      toast.warning("Date and time are required to reschedule.");
      return;
    }

    const token = localStorage.getItem("access_token");

    const res = await fetch(`http://localhost:8000/bookings/reschedule/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date: newDate, time: newTime }),
    });

    if (res.ok) {
      toast.success("Booking rescheduled!");
      fetchBookings();
    } else {
      toast.error("Failed to reschedule booking.");
    }
  };

  const handleCancel = async (bookingId: number) => {
    const confirmCancel = confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    const token = localStorage.getItem("access_token");

    const res = await fetch(`http://localhost:8000/bookings/cancel/${bookingId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      toast.success("Booking cancelled.");
      fetchBookings();
    } else {
      toast.error("Failed to cancel booking.");
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token");

      if (!token) throw new Error("Authentication required");

      const res = await fetch("http://localhost:8000/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load bookings";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatTime = (timeString: string) => timeString;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchBookings}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <button
          onClick={fetchBookings}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
        >
          Refresh
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't made any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-white p-5">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.service_type}
                  </h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date & Time</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(booking.date)} at {formatTime(booking.time)}
                    </p>
                  </div>

                  {booking.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Notes</p>
                      <p className="text-sm text-gray-900">{booking.notes}</p>
                    </div>
                  )}
                </div>

                {(booking.status === "Pending" || booking.status === "Accepted") && (
                  <div className="mt-4 flex space-x-3">
                    <button
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100"
                      onClick={() => handleReschedule(booking.id)}
                    >
                      Reschedule
                    </button>
                    <button
                      className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
