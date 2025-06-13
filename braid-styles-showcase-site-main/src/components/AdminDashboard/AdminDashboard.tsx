import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import AppointmentsContent from './AppointmentContent';
import SavedStylesContent from './SavedStylesContent';
import TutorialsContent from './TutorialContent';
import CommunityContent from './CommunityContent';
import ProductsContent from './ProductsContent';
import ManageAccountsContent from './ManageAccountsContent';

interface Appointment {
  id: number;
  date: string;
  time: string;
  service: string;
  stylist: string;
  duration: string;
  price: string;
}

export interface Style {
  id: number;
  name: string;
  image: string;
  difficulty: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const [upcomingAppointments] = useState<Appointment[]>([
    {
      id: 1,
      date: 'May 15, 2023',
      time: '10:00 AM',
      service: 'Box Braids Installation',
      stylist: 'Jamie Styles',
      duration: '3 hours',
      price: '$120'
    },
    {
      id: 2,
      date: 'May 22, 2023',
      time: '2:00 PM',
      service: 'Scalp Treatment',
      stylist: 'Jamie Styles',
      duration: '45 mins',
      price: '$35'
    }
  ]);

  const [savedStyles] = useState<Style[]>([
    {
      id: 1,
      name: 'Ghana Braids',
      image: '/ghana-braids.jpg',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      name: 'Knotless Box Braids',
      image: '/knotless-box.jpg',
      difficulty: 'Advanced'
    }
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username={username} handleLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1">
            {activeTab === 'dashboard' && <DashboardContent username={username} upcomingAppointments={upcomingAppointments} savedStyles={savedStyles} />}
            {activeTab === 'appointments' && <AppointmentsContent appointments={upcomingAppointments} />}
            {activeTab === 'saved' && <SavedStylesContent styles={savedStyles} />}
            {activeTab === 'tutorials' && <TutorialsContent />}
            {activeTab === 'community' && <CommunityContent />}
            {activeTab === 'products' && <ProductsContent />}
            {activeTab === 'accounts' && <ManageAccountsContent />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
