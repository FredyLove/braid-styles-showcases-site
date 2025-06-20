import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Clock, RefreshCw, Edit, X, Check, AlertTriangle } from "lucide-react";

type Booking = {
  id: number;
  service_type: string;
  date: string;
  time: string;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  notes?: string;
};

const statusConfig = {
  Pending: {
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    icon: <Clock className="h-4 w-4 mr-1" />,
  },
  Accepted: {
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    icon: <Check className="h-4 w-4 mr-1" />,
  },
  Rejected: {
    color: "bg-red-100 text-red-800 hover:bg-red-200",
    icon: <X className="h-4 w-4 mr-1" />,
  },
  Completed: {
    color: "bg-green-100 text-green-800 hover:bg-green-200",
    icon: <Check className="h-4 w-4 mr-1" />,
  },
};

const UserBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<number | null>(null);

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

  const handleReschedule = async (bookingId: number) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (e.g. 14:00):");

    if (!newDate || !newTime) {
      toast.warning("Both date and time are required to reschedule");
      return;
    }

    try {
      setProcessing(bookingId);
      const token = localStorage.getItem("access_token");

      const res = await fetch(`http://localhost:8000/bookings/reschedule/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: newDate, time: newTime }),
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("Booking rescheduled successfully!");
      await fetchBookings();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to reschedule booking");
    } finally {
      setProcessing(null);
    }
  };

  const handleCancel = async (bookingId: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setProcessing(bookingId);
      const token = localStorage.getItem("access_token");

      const res = await fetch(`http://localhost:8000/bookings/cancel/${bookingId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      toast.success("Booking cancelled successfully!");
      await fetchBookings();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to cancel booking");
    } finally {
      setProcessing(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="font-bold">Error</p>
            </div>
            <p className="mt-1">{error}</p>
            <Button
              onClick={fetchBookings}
              variant="destructive"
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              My Bookings
            </CardTitle>
            <Button onClick={fetchBookings} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't made any bookings yet.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.service_type}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(booking.date)}</span>
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatTime(booking.time)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[booking.status].color}>
                          {statusConfig[booking.status].icon}
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {booking.notes || "-"}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {(booking.status === "Pending" || booking.status === "Accepted") && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReschedule(booking.id)}
                              disabled={processing === booking.id}
                            >
                              {processing === booking.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Edit className="mr-2 h-4 w-4" />
                              )}
                              Reschedule
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancel(booking.id)}
                              disabled={processing === booking.id}
                            >
                              {processing === booking.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="mr-2 h-4 w-4" />
                              )}
                              Cancel
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBookings;