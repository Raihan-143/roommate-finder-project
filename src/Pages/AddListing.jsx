// src/pages/AddListing.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    rent: '',
    description: '',
    contact: '',
    image: '',
    email: '', // Optional: If you track user's email
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/roommates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.insertedId) {
        Swal.fire('Success!', 'Roommate listing added successfully!', 'success');
        setFormData({ title: '', location: '', rent: '', description: '', contact: '', image: '', email: '' });
      }
    } catch (err) {
        console.log(err);
      Swal.fire('Error!', 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Roommate Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="rent" placeholder="Rent" value={formData.rent} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded" rows={4}></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Add Listing</button>
      </form>
    </div>
  );
};

export default AddListing;
