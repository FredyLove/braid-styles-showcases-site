import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import OverviewContent from './OverviewContent';
import AppointmentsContent from './AppointmentContent';
import FavoritesContent from './FavoritesContent';
import TutorialsContent from './TutorialContent';
import ProductsContent from './ProductsContent';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Simulate fetching user data from local storage or an API
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername) {
      setUsername(storedUsername);
    } else if (storedEmail) {
      setUsername(storedEmail || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Navigate to edit profile page
  };

  const [upcomingAppointments] = useState([
    {
      id: 1,
      date: 'Jun 10, 2023',
      time: '10:00 AM',
      service: 'Ghana Braids',
      stylist: 'Jamie Styles',
      duration: '4 hours',
      price: '$150',
      status: 'Confirmed'
    },
    {
      id: 2,
      date: 'Jun 24, 2023',
      time: '2:00 PM',
      service: 'Scalp Treatment',
      stylist: 'Alex Curls',
      duration: '1 hour',
      price: '$45',
      status: 'Confirmed'
    }
  ]);

  const [favoriteStyles] = useState([
    {
      id: 1,
      name: 'Knotless Box Braids',
      image: '/knotless-box.jpg',
      lastDone: 'May 2023',
      priceRange: '$120-$180'
    },
    {
      id: 2,
      name: 'Lemonade Braids',
      image: '/lemonade-braids.jpg',
      lastDone: 'March 2023',
      priceRange: '$100-$150'
    }
  ]);

  const [recommendedProducts] = useState([
    {
      id: 1,
      name: 'Braiding Hair - X-Pression',
      image: '/braiding-hair.jpg',
      price: '$12.99',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Edge Control Gel',
      image: '/edge-control.jpg',
      price: '$8.99',
      rating: 4.2
    }
  ]);

  return (
    <div className="min-h-screen bg-amber-50">
      <Header
        username={username}
        onLogout={handleLogout}
        onEditProfile={handleEditProfile}
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1">
            {activeTab === 'overview' && (
              <OverviewContent
                username={username}
                upcomingAppointments={upcomingAppointments}
                favoriteStyles={favoriteStyles}
                recommendedProducts={recommendedProducts}
              />
            )}
            {activeTab === 'appointments' && <AppointmentsContent />}
            {activeTab === 'favorites' && <FavoritesContent />}
            {activeTab === 'tutorials' && <TutorialsContent />}
            {activeTab === 'products' && <ProductsContent />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
