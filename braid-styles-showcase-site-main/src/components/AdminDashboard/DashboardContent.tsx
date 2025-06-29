import { Scissors, Calendar, Users, ArrowUp, CreditCard, Clock, RefreshCw } from 'lucide-react';

const DashboardContent = () => {
  // Sample data - replace with your actual data
  const stats = [
    { name: 'Today Appointments', value: 3, icon: Calendar, change: '+1 from yesterday' },
    { name: 'Monthly Revenue', value: '$1,240', icon: CreditCard, change: '12% from last month' },
    { name: 'Active Clients', value: 2, icon: Users, change: '1 new this week' },
    { name: 'Popular Style', value: 'Knotless', icon: Scissors, change: 'Trending +8%' },
  ];

  const recentBookings = [
    { id: 1, client: 'Jamila K.', service: 'Box Braids', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, client: 'Tasha B.', service: 'Goddess Locs', time: '2:30 PM', status: 'Pending' },
    { id: 3, client: 'Aisha M.', service: 'Cornrows', time: '4:00 PM', status: 'Confirmed' },
  ];

  const quickActions = [
    { name: 'Add New Booking', icon: Calendar, href: '#', color: 'bg-blue-100 text-blue-600' },
    { name: 'View Schedule', icon: Clock, href: '#', color: 'bg-purple-100 text-purple-600' },
    { name: 'Track Expenses', icon: CreditCard, href: '#', color: 'bg-green-100 text-green-600' },
    { name: 'Update Services', icon: Scissors, href: '#', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#b36f34]">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, statIdx) => (
          <div key={statIdx} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <stat.icon className="h-8 w-8 text-[#b36f34]" />
              <h3 className="ml-3 text-sm font-medium text-gray-500">{stat.name}</h3>
            </div>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, actionIdx) => (
            <a
              key={actionIdx}
              href={action.href}
              className={`${action.color} p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-shadow`}
            >
              <action.icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium text-center">{action.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Today's Appointments</h2>
            <button className="text-sm text-[#b36f34] hover:underline flex items-center">
              View All <RefreshCw className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{booking.client}</h3>
                  <p className="text-sm text-gray-500">{booking.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { id: 1, action: 'New booking from Jamila K.', time: '2 hours ago' },
              { id: 2, action: 'Payment received from Tasha B.', time: '5 hours ago' },
              { id: 3, action: 'Aisha M. rescheduled appointment', time: '1 day ago' },
              { id: 4, action: 'New client registered: Keisha L.', time: '2 days ago' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="bg-[#b36f34] text-white p-2 rounded-full mr-3">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;