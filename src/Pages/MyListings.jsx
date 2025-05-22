import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import noListData from "../assets/lottie/no-list.json";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/myroommates/user?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setListings(data);
          setLoading(false);
        })
        .catch(() => {
          Swal.fire("Error", "Failed to load your listings", "error");
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/roommates/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your listing has been deleted.", "success");
              setListings(listings.filter((item) => item._id !== id));
            } else {
              Swal.fire("Error", "Could not delete the listing.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong while deleting.", "error");
          });
      }
    });
  };

  if (!user?.email) {
    return (
      <div className="text-center mt-20 text-xl text-red-600 dark:text-red-400 font-semibold">
        Please login to view your listings.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-500 dark:text-gray-400 font-medium">
        Loading your listings...
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-lg text-gray-500 dark:text-gray-400 font-medium">
        <p className="mb-4">You have not added any roommate listings yet.</p>
        <div className="w-64">
          <Lottie animationData={noListData} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700 dark:text-blue-400">
        My Given Roommate Listings
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                {item.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Location:</span> {item.location}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Rent:</span> {item.rent}৳
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm line-clamp-3">
                <span className="font-medium">Description:</span>{" "}
                {item.description || "No description provided."}
              </p>
            </div>
            <div className="flex justify-between mt-6">
              <Link to={`/update/${item._id}`}>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md cursor-pointer">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
