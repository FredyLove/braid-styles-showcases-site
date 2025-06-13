import { HeartIcon } from '@heroicons/react/24/outline';

interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
  stylist: string;
  duration: string;
  price: string;
}

interface Style {
  id: number;
  name: string;
  image: string;
  difficulty: string;
}

interface DashboardContentProps {
  username: string;
  upcomingAppointments: Appointment[];
  savedStyles: Style[];
}

const DashboardContent = ({ username, upcomingAppointments, savedStyles }: DashboardContentProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#b36f34] mb-2">Welcome back, {username}!</h2>
        <p className="text-gray-600">You have 2 upcoming appointments and 3 saved styles.</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {upcomingAppointments.map((appointment) => (
            <li key={appointment.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#b36f34]">
                    {appointment.date} • {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {appointment.service} with {appointment.stylist}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.price}</p>
                  <p className="text-xs text-gray-500 mt-1">{appointment.duration}</p>
                </div>
              </div>
              <div className="mt-3 flex space-x-3">
                <button className="text-sm text-[#b36f34] hover:underline">Reschedule</button>
                <button className="text-sm text-red-600 hover:underline">Cancel</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-6 py-4 bg-gray-50 text-right">
          <button className="text-sm font-medium text-[#b36f34] hover:text-[#9e5f2d]">
            View all appointments →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Your Saved Styles</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
          {savedStyles.map((style) => (
            <div key={style.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow">
                  <HeartIcon className="h-5 w-5 text-[#b36f34]" />
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-medium">{style.name}</h4>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-[#f8e8d8] text-[#b36f34] rounded-full">
                    {style.difficulty}
                  </span>
                  <button className="text-sm text-[#b36f34] hover:underline">Book this style</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 text-right">
          <button className="text-sm font-medium text-[#b36f34] hover:text-[#9e5f2d]">
            View all saved styles →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
