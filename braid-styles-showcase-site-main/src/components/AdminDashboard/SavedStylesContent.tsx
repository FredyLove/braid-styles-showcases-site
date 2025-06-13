import { Style } from './AdminDashboard';

interface SavedStylesContentProps {
  styles: Style[];
}

const SavedStylesContent = ({ styles }: SavedStylesContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#b36f34] mb-6">Saved Styles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div key={style.id} className="bg-gray-100 rounded-lg overflow-hidden shadow">
            <img src={style.image} alt={style.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{style.name}</h3>
              <p className="text-gray-700 mb-4">Difficulty: {style.difficulty}</p>
              <div className="flex justify-between">
                <button className="text-sm text-[#b36f34] hover:underline">View Tutorial</button>
                <button className="text-sm text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedStylesContent;
