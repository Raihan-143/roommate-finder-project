import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../Contexts/AuthContext'; // ✅ Fixed import

const RoomMateDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); // ✅ Correct usage
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

  if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      <img
        src={roommate.image || 'https://via.placeholder.com/600x300?text=No+Image'}
        alt={roommate.title}
        className="w-full max-h-[300px] object-cover rounded-xl"

        // className="w-full h-80 object-cover rounded-xl"
      />

      <div className="mt-6">
        <h2 className="text-3xl font-bold mb-2">{roommate.title}</h2>
        <p className="text-gray-600 mb-2">📍 <strong>Location:</strong> {roommate.location}</p>
        <p className="text-gray-600 mb-2">💸 <strong>Rent:</strong> {roommate.rent} ৳</p>
        <p className="text-gray-600 mb-2">📞 <strong>Contact:</strong> {roommate.contact}</p>
        <p className="text-gray-700 mt-4"><strong>Description:</strong> {roommate.description}</p>

       <div className='flex justify-between'>
        <div>
         <button
          className="mt-6 px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition duration-300"
          onClick={handleLike}
        >
          ❤️ Like
        </button>

        <p className="mt-3 text-sm text-gray-600">
          Total Likes: <strong>{roommate?.likes?.length || 0}</strong>
        </p>
       </div>
        <Link to='/browse'>
        <button
          className="mt-4 ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300"
        >
          🔍 Go to Browse
        </button>
        </Link>
       </div>
      </div>
    </div>
  );
};

export default RoomMateDetails;
