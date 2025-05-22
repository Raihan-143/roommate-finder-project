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
      <div className="text-center mt-20 text-xl text-gray-600 font-semibold">
        Loading roommate details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6 py-10 bg-white rounded-2xl shadow-lg">
      <img
        src={roommate.image || 'https://via.placeholder.com/600x300?text=No+Image'}
        alt={roommate.title}
        className="w-full h-[300px] object-cover rounded-xl shadow-md"
      />

      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{roommate.title}</h2>
        <div className="space-y-2 text-gray-700 text-lg">
          <p><strong>📍 Location:</strong> {roommate.location}</p>
          <p><strong>💸 Rent:</strong> {roommate.rent} ৳</p>
          <p><strong>📞 Contact:</strong> {roommate.contact}</p>
        </div>

        <div className="mt-6">
          <p className="text-gray-700 leading-relaxed">
            <strong>Description:</strong><br />
            {roommate.description || "No description provided."}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={handleLike}
              className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-lg transition duration-300 shadow"
            >
              ❤️ Like
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Total Likes: <strong>{roommate?.likes?.length || 0}</strong>
            </p>
          </div>

          <Link to="/browse">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-300 shadow">
              🔍 Back to Browse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomMateDetails;
