import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:3000/products");
  return res.data;
};

const ProductSearch = () => {
  const { search } = useLocation();

  // ✅ Get query directly from URL
  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";

  // Fetch products
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // ✅ Filter based on query
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
  );

  return (
    <div className="px-4 sm:px-10 lg:px-20 py-8 bg-gray-50 min-h-screen">
      {/* Results and states */}
      {!query ? (
        <p className="text-center text-lg text-gray-500">
          Please enter a search term.
        </p>
      ) : isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-center text-lg text-red-500">
          Failed to load products.
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-2xl text-gray-400 font-semibold text-center pt-20">
          No products found for{" "}
          <span className="text-pink-500">{query}</span>
        </p>
      ) : (
        <>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Search results for <span className="text-pink-600">"{query}"</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <p className="text-pink-600 font-bold mt-2">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSearch;
