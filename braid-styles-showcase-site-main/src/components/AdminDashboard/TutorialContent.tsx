const TutorialsContent = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#b36f34] mb-6">Tutorials</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Ghana Braids Tutorial</h3>
            <p className="text-gray-700">Learn how to create beautiful Ghana Braids with this step-by-step guide.</p>
            <button className="mt-2 text-sm text-[#b36f34] hover:underline">Watch Now</button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Knotless Box Braids Tutorial</h3>
            <p className="text-gray-700">Master the art of Knotless Box Braids with our detailed tutorial.</p>
            <button className="mt-2 text-sm text-[#b36f34] hover:underline">Watch Now</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TutorialsContent;
  