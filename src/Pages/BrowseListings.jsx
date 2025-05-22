import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import noDataAnimation from '../assets/lottie/no-data.json'

const BrowseListings = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 6;

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/roommates?search=${search}&page=${page}&limit=${limit}`
        );
        const data = await res.json();

        setListings(data.result || []);
        const total = data.total || data.result?.length || 0;
        setTotalPages(Math.ceil(total / limit));
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        setListings([]);
        setTotalPages(1);
      }
      setLoading(false);
    };

    fetchListings();
  }, [search, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse Listings</h2>

      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by title, location, or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-l-md w-72"
        />
        <button
          type="submit"
          className="bg-indigo-700 text-white px-4 py-2 rounded-r-md"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading listings...</p>
      ) : listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-60 h-60">
            <Lottie animationData={noDataAnimation} loop={true} />
          </div>
        </div>
      ) : (
        <Fade cascade damping={0.1} triggerOnce>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={item.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin size={14} />
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm mb-3">
                    {item.description?.slice(0, 80)}...
                  </p>

                  <Link to={`/roommates/${item._id}`}>
                    <button className="w-full mt-2 py-2 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white rounded-lg font-medium hover:scale-105 transition transform duration-300">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 border rounded ${page === idx + 1 ? "bg-blue-500 text-white" : ""
              }`}
            disabled={loading}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowseListings;
