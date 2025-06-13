import { HeartIcon } from '@heroicons/react/24/outline';

interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
  stylist: string;
  duration: string;
  price: string;
  status: string;
}

interface Style {
  id: number;
  name: string;
  image: string;
  lastDone: string;
  priceRange: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
}

interface OverviewContentProps {
  username: string;
  upcomingAppointments: Appointment[];
  favoriteStyles: Style[];
  recommendedProducts: Product[];
}

const OverviewContent = ({ username, upcomingAppointments, favoriteStyles, recommendedProducts }: OverviewContentProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#b36f34] mb-2">Welcome back, {username}!</h2>
        <p className="text-gray-600">Here's what's happening with your braid journey.</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
          <button className="text-sm text-[#b36f34] hover:underline">View All</button>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.slice(0, 2).map((appointment) => (
            <div key={appointment.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#b36f34]">
                    {appointment.date} • {appointment.time}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {appointment.service} with {appointment.stylist}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                  <p className="text-sm font-medium mt-1">{appointment.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Your Favorite Styles</h3>
          <button className="text-sm text-[#b36f34] hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          {favoriteStyles.map((style) => (
            <div key={style.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-100 relative">
                <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow">
                  <HeartIcon className="h-5 w-5 text-[#b36f34] fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-medium">{style.name}</h4>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Last done: {style.lastDone}</span>
                  <span className="text-xs font-medium">{style.priceRange}</span>
                </div>
                <button className="mt-3 w-full py-1.5 text-sm bg-[#f8e8d8] text-[#b36f34] rounded-md hover:bg-[#f0d8c0]">
                  Book This Style
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recommended For You</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:opacity-75" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-[#b36f34]">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
