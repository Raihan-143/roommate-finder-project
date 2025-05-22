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
    <div className="max-w-2xl mx-auto mt-2 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
  <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700 dark:text-indigo-300">
    Add a New Roommate Listing
  </h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <label className="label text-gray-700 dark:text-gray-300">Title</label>
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={formData.title}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />
    
    <label className="label text-gray-700 dark:text-gray-300">Location</label>
    <input
      type="text"
      name="location"
      placeholder="Location"
      value={formData.location}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />

    <label className="label text-gray-700 dark:text-gray-300">Rent Fee</label>
    <input
      type="number"
      name="rent"
      placeholder="Rent"
      value={formData.rent}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />

    <label className="label text-gray-700 dark:text-gray-300">Contact Number</label>
    <input
      type="text"
      name="contact"
      placeholder="Contact Number"
      value={formData.contact}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />

    <label className="label text-gray-700 dark:text-gray-300">Image URL</label>
    <input
      type="text"
      name="image"
      placeholder="Image URL"
      value={formData.image}
      onChange={handleChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />

    <label className="label text-gray-700 dark:text-gray-300">Description</label>
    <textarea
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
      rows={4}
    ></textarea>

    <button
      type="submit"
      disabled={loading}
      className={`bg-indigo-700 text-white px-4 py-2 cursor-pointer rounded w-full transition 
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-800'} 
        dark:bg-indigo-600 dark:hover:bg-indigo-700`}
    >
      {loading ? 'Submitting...' : 'Add Listing'}
    </button>
  </form>
</div>

  );
};

export default AddListing;
