import { MessageSquare, Users, TrendingUp, Calendar, Scissors } from 'lucide-react';

const CommunityContent = () => {
  const featuredStylists = [
    { id: 1, name: "Amina Styles", specialty: "Box Braids", rating: "4.9", image: "/stylists/amina.jpg" },
    { id: 2, name: "Keisha Locs", specialty: "Dreadlocks", rating: "4.8", image: "/stylists/keisha.jpg" },
    { id: 3, name: "Jade Twists", specialty: "Senegalese Twists", rating: "4.7", image: "/stylists/jade.jpg" }
  ];

  const trendingStyles = [
    { id: 1, name: "Knotless Box Braids", saves: "1.2k" },
    { id: 2, name: "Fulani Braids", saves: "980" },
    { id: 3, name: "Goddess Locs", saves: "1.5k" },
    { id: 4, name: "Lemonade Braids", saves: "1.1k" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Braiding Masterclass", date: "June 15", host: "Amina Styles" },
    { id: 2, title: "Natural Hair Care Workshop", date: "June 22", host: "Natural Roots Org" },
    { id: 3, title: "Business of Braiding Seminar", date: "July 5", host: "Braids Entrepreneurs" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-[#b36f34] mb-6 flex items-center">
        <Users className="mr-2 h-6 w-6" /> BraidArt Community
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Discussion Forum */}
        <div className="bg-[#faf7f5] p-5 rounded-lg border border-[#eee8e0]">
          <div className="flex items-center mb-4">
            <MessageSquare className="text-[#b36f34] mr-2" />
            <h3 className="font-bold text-lg">Discussion Forum</h3>
          </div>
          <p className="text-gray-700 mb-4">Connect with fellow braiders, share tips, and get advice from professionals.</p>
          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <div className="bg-[#b36f34] text-white rounded-full p-2 mr-3">
                <Scissors className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">How do you prevent braid frizz in humid weather?</p>
                <p className="text-sm text-gray-500">23 comments • 4h ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#b36f34] text-white rounded-full p-2 mr-3">
                <Scissors className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Best products for scalp care with tight braids?</p>
                <p className="text-sm text-gray-500">41 comments • 1d ago</p>
              </div>
            </div>
          </div>
          <button className="w-full py-2 bg-[#b36f34] hover:bg-[#9c5f2d] text-white rounded-lg font-medium">
            Join Discussion
          </button>
        </div>

        {/* Featured Stylists */}
        <div className="bg-[#faf7f5] p-5 rounded-lg border border-[#eee8e0]">
          <div className="flex items-center mb-4">
            <Users className="text-[#b36f34] mr-2" />
            <h3 className="font-bold text-lg">Featured Stylists</h3>
          </div>
          <p className="text-gray-700 mb-4">Connect with top-rated braiding professionals in your area.</p>
          <div className="space-y-4">
            {featuredStylists.map(stylist => (
              <div key={stylist.id} className="flex items-center">
                <img 
                  src={stylist.image} 
                  alt={stylist.name} 
                  className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-[#b36f34]"
                />
                <div>
                  <p className="font-medium">{stylist.name}</p>
                  <p className="text-sm text-gray-600">{stylist.specialty} • ⭐ {stylist.rating}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 border border-[#b36f34] text-[#b36f34] hover:bg-[#f0e6df] rounded-lg font-medium">
            View All Stylists
          </button>
        </div>

        {/* Trending Styles */}
        <div className="bg-[#faf7f5] p-5 rounded-lg border border-[#eee8e0]">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-[#b36f34] mr-2" />
            <h3 className="font-bold text-lg">Trending Styles</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {trendingStyles.map(style => (
              <div key={style.id} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="font-medium">{style.name}</p>
                <p className="text-sm text-gray-500">🔥 {style.saves} saves</p>
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-white border border-[#b36f34] text-[#b36f34] hover:bg-[#f0e6df] rounded-lg font-medium">
            Explore More Styles
          </button>
        </div>

        {/* Community Events */}
        <div className="bg-[#faf7f5] p-5 rounded-lg border border-[#eee8e0]">
          <div className="flex items-center mb-4">
            <Calendar className="text-[#b36f34] mr-2" />
            <h3 className="font-bold text-lg">Upcoming Events</h3>
          </div>
          <div className="space-y-4 mb-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-start">
                <div className="bg-[#b36f34] text-white rounded-lg p-2 mr-3 text-center min-w-[50px]">
                  <p className="font-bold">{event.date.split(' ')[1]}</p>
                  <p className="text-xs">{event.date.split(' ')[0]}</p>
                </div>
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-600">Hosted by {event.host}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-[#b36f34] hover:bg-[#9c5f2d] text-white rounded-lg font-medium">
            View All Events
          </button>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="mt-8 bg-[#faf7f5] p-5 rounded-lg border border-[#eee8e0]">
        <h3 className="font-bold text-lg mb-3">Community Guidelines</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
          <li>Be respectful and kind to all community members</li>
          <li>Share your knowledge and techniques freely</li>
          <li>Give proper credit when sharing others' work</li>
          <li>No spam or self-promotion outside designated areas</li>
          <li>Keep discussions professional and on-topic</li>
        </ul>
        <button className="text-[#b36f34] font-medium hover:underline flex items-center">
          Read Full Guidelines <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityContent;