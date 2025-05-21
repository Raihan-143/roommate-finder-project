
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";


const BrowseListings = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    fetch(`http://localhost:3000/roommates?search=${search}&page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data.result || []);
        const total = data.total || data.result?.length || 0;
        setTotalPages(Math.ceil(total / limit));
      });
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md">Search</button>
      </form>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={item.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">{item.location}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-3">
                {item.description?.slice(0, 80)}...
              </p>

              <Link to={`/roommates/${item._id}`}>
                <button className="w-full mt-2 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition transform duration-300">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>


      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 border ${page === idx + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowseListings;
