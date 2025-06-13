const ProductsContent = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-[#b36f34] mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Braiding Hair</h3>
            <p className="text-gray-700">High-quality braiding hair for all your styling needs.</p>
            <button className="mt-2 text-sm text-[#b36f34] hover:underline">Shop Now</button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg">Styling Gel</h3>
            <p className="text-gray-700">Keep your braids looking fresh with our premium styling gel.</p>
            <button className="mt-2 text-sm text-[#b36f34] hover:underline">Shop Now</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductsContent;
  