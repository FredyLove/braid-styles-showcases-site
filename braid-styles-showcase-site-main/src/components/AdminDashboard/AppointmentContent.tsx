interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
  stylist: string;
  duration: string;
  price: string;
}

interface AppointmentsContentProps {
  appointments: Appointment[];
}

const AppointmentsContent = ({ appointments }: AppointmentsContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#b36f34] mb-6">Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stylist
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.stylist}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsContent;
