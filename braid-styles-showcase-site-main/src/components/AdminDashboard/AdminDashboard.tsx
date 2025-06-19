import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import AppointmentsContent from './AppointmentContent';
import ServicesContent from './ServicesContent';
import TutorialsContent from './TutorialContent';
import CommunityContent from './CommunityContent';
import ProductsContent from './ProductsContent';
import ManageAccountsContent from './ManageAccountsContent';

export interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  icon: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();


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
            {activeTab === 'dashboard' && <DashboardContent/>}
            {activeTab === 'appointments' && <AppointmentsContent />}
            {activeTab === 'services' && <ServicesContent />}
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
