import { ShoppingBag, Scissors, SprayCan, Fan, Droplets, Droplet } from 'lucide-react';

const ProductsContent = () => {
  const productCategories = [
    {
      id: 1,
      name: "Braiding Hair Bundles",
      description: "Premium synthetic & human hair for all braid styles",
      priceRange: "$15-$50",
      icon: <Scissors className="text-[#b36f34] h-8 w-8" />,
      popularItems: ["X-Pression Pre-Stretched", "Kanekalon Jumbo Braid", "Ombre Passion Twists"]
    },
    {
      id: 2,
      name: "Edge Control & Gels",
      description: "Keep your edges laid and braids neat for weeks",
      priceRange: "$8-$20",
      icon: <SprayCan className="text-[#b36f34] h-8 w-8" />,
      popularItems: ["Eco Style Gel", "Got2b Glued", "African Pride Braid Spray"]
    },
    {
      id: 3,
      name: "Scalp & Hair Oils",
      description: "Nourishing treatments for healthy hair under braids",
      priceRange: "$10-$25",
      icon: <Droplet className="text-[#b36f34] h-8 w-8" />,
      popularItems: ["Wild Growth Oil", "Jamaican Black Castor Oil", "Tea Tree Scalp Treatment"]
    },
    {
      id: 4,
      name: "Braiding Tools",
      description: "Essential tools for professional braiding results",
      priceRange: "$5-$30",
      icon: <Fan className="text-[#b36f34] h-8 w-8" />,
      popularItems: ["Rat Tail Comb", "Tension Clips", "Braiding Needle"]
    },
    {
      id: 5,
      name: "Aftercare Kits",
      description: "Everything clients need to maintain their braids",
      priceRange: "$25-$60",
      icon: <ShoppingBag className="text-[#b36f34] h-8 w-8" />,
      popularItems: ["Braided Wig Care Kit", "Loc Maintenance Set", "Silk Bonnet & Scarf"]
    },
    {
      id: 6,
      name: "Digital Products",
      description: "Instant downloads with no inventory needed",
      priceRange: "$5-$50",
      icon: <ShoppingBag className="text-[#b36f34] h-8 w-8" />,
      popularItems: ["Braid Style eBook", "Business Templates", "Video Tutorials"]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-[#b36f34] mb-6 flex items-center">
        <ShoppingBag className="mr-2 h-6 w-6" /> BraidArt Products
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productCategories.map(category => (
          <div key={category.id} className="bg-[#faf7f5] p-5 rounded-lg border border-[#eee8e0] hover:shadow-md transition-shadow">
            <div className="flex items-start mb-4">
              <div className="bg-[#f0e6df] p-2 rounded-lg mr-3">
                {category.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-gray-700 text-sm">{category.description}</p>
                <p className="text-sm font-medium mt-1">{category.priceRange}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Popular Items:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {category.popularItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <button className="w-full py-2 bg-[#b36f34] hover:bg-[#9c5f2d] text-white rounded-lg font-medium text-sm">
              View Products
            </button>
          </div>
        ))}
      </div>

      {/* Digital Products Section */}
      <div className="mt-8 bg-[#f0e6df] p-5 rounded-lg border border-[#b36f34]">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" /> No-Inventory Options
        </h3>
        <p className="text-gray-700 mb-4">
          Digital products let you earn without stocking physical items. Perfect for sharing your braiding expertise!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium">eBooks & Guides</h4>
            <p className="text-sm text-gray-600">Share your braiding knowledge</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium">Video Tutorials</h4>
            <p className="text-sm text-gray-600">Teach techniques digitally</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium">Business Templates</h4>
            <p className="text-sm text-gray-600">Help others start their hustle</p>
          </div>
        </div>
        <button className="text-[#b36f34] font-medium hover:underline flex items-center">
          Learn About Selling Digital Products <span className="ml-1">→</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsContent;