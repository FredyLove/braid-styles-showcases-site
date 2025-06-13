const CommunityContent = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#b36f34] mb-6">Community</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Community Guidelines</h3>
            <p className="text-gray-700">Please read our community guidelines to ensure a positive experience for everyone.</p>
            <button className="mt-2 text-sm text-[#b36f34] hover:underline">Read More</button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Join the Discussion</h3>
            <p className="text-gray-700">Engage with other members of the BraidArt community and share your experiences.</p>
            <button className="mt-2 text-sm text-[#b36f34] hover:underline">Join Now</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CommunityContent;
  