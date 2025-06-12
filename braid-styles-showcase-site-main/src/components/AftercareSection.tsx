import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";

const AftercareSection = () => {
  const [activeTab, setActiveTab] = useState('washing');

  const tabs = [
    { id: 'washing', label: 'Washing' },
    { id: 'moisturizing', label: 'Moisturizing' },
    { id: 'nightcare', label: 'Night Care' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  const renderList = (items: string[]) => (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  const tabContent = {
    washing: {
      title: "Washing Your Braids",
      points: [
        "Use a sulfate-free shampoo to prevent dryness",
        "Dilute shampoo with water and gently apply to scalp",
        "Rinse thoroughly to avoid residue buildup",
        "Limit washing to once every 2–3 weeks"
      ]
    },
    moisturizing: {
      title: "Moisturizing Your Hair",
      points: [
        "Spritz hair with water and apply leave-in conditioner 2–3 times per week",
        "Seal moisture with a light oil like jojoba or argan",
        "Avoid heavy products that cause buildup on the scalp",
        "Massage gently to stimulate circulation"
      ]
    },
    nightcare: {
      title: "Night Care Routine",
      points: [
        "Wrap braids with a silk or satin scarf before bed",
        "Use a satin pillowcase for extra protection",
        "Avoid sleeping with damp hair",
        "Keep braids loosely tied to prevent tension"
      ]
    },
    maintenance: {
      title: "Long-Term Maintenance",
      points: [
        "Touch up edges or new growth every 4–6 weeks",
        "Keep scalp clean and itch-free with witch hazel or braid spray",
        "Do not leave braids in longer than 8 weeks",
        "Schedule regular consultations with your stylist"
      ]
    }
  };

  const { title, points } = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Aftercare Instructions</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            {renderList(points)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AftercareSection;
