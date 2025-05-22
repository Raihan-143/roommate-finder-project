import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../Contexts/AuthContext';

const RoomMateDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoommate = async () => {
      try {
        const res = await fetch(`http://localhost:3000/roommates/${id}`);
        const data = await res.json();
        setRoommate(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        Swal.fire('Error', 'Failed to load roommate details.', 'error');
      }
    };

    fetchRoommate();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      Swal.fire('Login Required', 'Please login to like listings.', 'warning');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/roommates/like/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.uid }),
      });

      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire('Liked!', 'You liked this listing.', 'success');
        setRoommate(prev => ({
          ...prev,
          likes: [...(prev.likes || []), user.uid],
        }));
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to like this listing.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600 font-semibold dark:text-gray-300">
        Loading roommate details...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-2xl rounded-3xl overflow-hidden dark:bg-gray-900 dark:shadow-gray-800">
      <div className="grid md:grid-cols-2">
        <img
          src={roommate.image || 'https://via.placeholder.com/600x400?text=No+Image'}
          alt={roommate.title}
          className="w-full h-full object-cover"
        />

        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">{roommate.title}</h2>

            <ul className="space-y-2 text-gray-700 text-[17px] font-medium dark:text-gray-300">
              <li>📍 <strong>Location:</strong> {roommate.location}</li>
              <li>💸 <strong>Rent:</strong> {roommate.rent} ৳</li>
              <li>📞 <strong>Contact:</strong> {roommate.contact}</li>
            </ul>

            <div className="mt-4 text-gray-700 text-base leading-relaxed dark:text-gray-300">
              <p><strong>📝 Description:</strong></p>
              <p>{roommate.description || "No description provided."}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <button
                onClick={handleLike}
                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition duration-300 shadow cursor-pointer"
              >
                ❤️ Like
              </button>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Total Likes: <strong>{roommate?.likes?.length || 0}</strong>
              </p>
            </div>

            <Link to="/browse">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition duration-300 shadow cursor-pointer">
                🔙 Back to Browse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomMateDetails;
