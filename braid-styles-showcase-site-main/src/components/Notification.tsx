/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  timestamp: string;
  type: string;
  related_id?: number;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8000/notifications?limit=5", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch("http://localhost:8000/notifications/unread-count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const count = await res.json();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/notifications/read/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-md z-50">
          <div className="p-3 font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-3 text-gray-500">No notifications</div>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  onClick={() => {
                    markAsRead(notif.id);
                    // Optional: Navigate to related booking or tutorial
                    if (notif.type === "booking") {
                      navigate(`/bookings/${notif.related_id}`);
                    } else if (notif.type === "tutorial") {
                      navigate(`/tutorials/${notif.related_id}`);
                    }
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    notif.is_read ? "text-gray-500" : "font-medium text-black"
                  } hover:bg-gray-100`}
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
