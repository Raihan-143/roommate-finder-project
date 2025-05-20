 
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AuthProvider from '/src/Contexts/AuthContext.jsx';

import Swal from 'sweetalert2';

const RoomMateDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthProvider);
  const [roommate, setRoommate] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/roommates/${id}`)
      .then(res => res.json())
      .then(data => setRoommate(data));
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      Swal.fire('Login Required', 'Please login to like listings.', 'warning');
      return;
    }

    const res = await fetch(`http://localhost:3000/roommates/like/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid }),
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
      Swal.fire('Liked!', 'You liked this roommate.', 'success');
      setRoommate({ ...roommate, likes: [...(roommate.likes || []), user.uid] });
    }
  };

  if (!roommate) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 shadow-xl rounded-2xl mt-8">
      <img src={roommate.image} alt="" className="w-full h-64 object-cover rounded-xl" />
      <h2 className="text-2xl font-bold my-4">{roommate.title}</h2>
      <p className="text-gray-700 mb-2">📍 {roommate.location}</p>
      <p className="text-gray-600">{roommate.description}</p>

      <button
        className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
        onClick={handleLike}
      >
        ❤️ Like
      </button>
      <p className="mt-2 text-sm text-gray-600">
        Total Likes: {roommate?.likes?.length || 0}
      </p>
    </div>
  );
};

export default RoomMateDetails;
