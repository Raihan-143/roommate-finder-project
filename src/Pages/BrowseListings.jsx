import { useEffect, useState } from "react";

const BrowseListings = () => {
  const [roommates, setRoommates] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const fetchData = async () => {
  try {
    const res = await fetch(
      `http://localhost:3000/roommates?search=${searchText}&page=${page}&limit=${limit}`
    );
    const data = await res.json();
    setRoommates(data.result || []); // safe fallback
    setTotal(data.total || 0);
  } catch (error) {
    console.error("Fetch Error:", error);
    setRoommates([]);
    setTotal(0);
  }
};


  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Search by title / location / name"
          className="input input-bordered w-full max-w-xs"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ml-2">Search</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {Array.isArray(roommates) && roommates.map(roommate => (
          <div key={roommate._id} className="card shadow-lg p-4 border rounded-xl">
            <h2 className="text-xl font-bold">{roommate.title}</h2>
            <p><strong>Location:</strong> {roommate.location}</p>
            <p><strong>Rent:</strong> {roommate.rent} ৳</p>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrowseListings;
