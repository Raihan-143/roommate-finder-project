// src/pages/AddListing.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../Contexts/AuthContext'; // ✅ import auth context

const AddListing = () => {
  const { user } = useAuth(); // ✅ get logged-in user
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    rent: '',
    description: '',
    contact: '',
    image: '',
  });

  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire('Error', 'You must be logged in to add a listing.', 'error');
      return;
    }

    const listingData = { ...formData, email: user.email };

    try {
      setLoading(true); // ✅ Start loading
      const res = await fetch('http://localhost:3000/roommates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingData),
      });

      const data = await res.json();
      setLoading(false); // ✅ Stop loading

      if (data.insertedId) {
        Swal.fire('Success!', 'Roommate listing added successfully!', 'success');
        setFormData({
          title: '',
          location: '',
          rent: '',
          description: '',
          contact: '',
          image: '',
        });
      }
    } catch (err) {
      setLoading(false); // ✅ Stop loading even on error
      console.log(err);
      Swal.fire('Error!', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Add a New Roommate Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="label">Title</label>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <label className="label">Location</label>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <label className="label">Rent Fee</label>
        <input type="number" name="rent" placeholder="Rent" value={formData.rent} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <label className="label">Contact Number</label>
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <label className="label">Image URL</label>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
        
        <label className="label">Description</label>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" rows={4}></textarea>
        
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {loading ? 'Submitting...' : 'Add Listing'}
        </button>
      </form>
    </div>
  );
};

export default AddListing;
