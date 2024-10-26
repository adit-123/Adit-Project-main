import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gst: '', // Optional field
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
    // Clear any existing data, then save the new form data in localStorage
    localStorage.clear();
    localStorage.setItem('name', formData.name);
    localStorage.setItem('mobile', formData.mobile);
    
    // Save GST only if provided
    if (formData.gst) {
      localStorage.setItem('gst', formData.gst);
    }
    
    // Navigate to the product page after saving
    navigate('/product');
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="bg-zinc-50 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
              Mobile No
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* GST Field (Optional) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="gst">
              GST No (Optional)
            </label>
            <input
              type="text"
              name="gst"
              id="gst"
              value={formData.gst}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your GST number (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
