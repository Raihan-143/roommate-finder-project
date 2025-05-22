import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/roommates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load listing data", "error");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      location: form.location.value,
      rent: form.rent.value,
      description: form.description.value,
    };

    fetch(`http://localhost:3000/roommates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", "Your listing was updated.", "success");
        navigate("/my-listings");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update the listing.", "error");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        {/* Spinner */}
        <svg
          className="animate-spin h-8 w-8 mx-auto text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Loading listing...
      </div>
    );
  }

  if (!listing) return <p className="text-center py-10">Listing not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-2">
  <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">
    Update Your Listing
  </h1>
  <form onSubmit={handleUpdate} className="space-y-6">
    <label className="label">Ttile</label>
    <input
      type="text"
      name="title"
      defaultValue={listing.title}
      placeholder="Enter Title"
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      required
    />
    <label className="label">Location</label>
    <input
      type="text"
      name="location"
      defaultValue={listing.location}
      placeholder="Enter Location"
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      required
    />
    <label className="label">Rent</label>
    <input
      type="number"
      name="rent"
      defaultValue={listing.rent}
      placeholder="Enter Rent (৳)"
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      required
    />
    <label className="label">Description</label>
    <textarea
      name="description"
      defaultValue={listing.description}
      placeholder="Enter Description"
      className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      required
    />
    <button
      type="submit"
      className="w-full bg-green-600 text-white rounded-lg py-3 font-semibold hover:bg-green-700 shadow-lg transition duration-300 cursor-pointer"
    >
      Update
    </button>
  </form>
</div>

  );
};

export default UpdateListing;
