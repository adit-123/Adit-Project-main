import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [forms, setForms] = useState(() => {
    const storedForms = localStorage.getItem('productForms');
    return storedForms
      ? JSON.parse(storedForms)
      : [{ productName: '', category: '', qty: '', unit: '', pay: '', description: '' }];
  });

  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const values = [...forms];
    const { name, value } = event.target;

    // Only parse to number if the value is non-empty for numeric fields
    values[index][name] = name === 'qty' || name === 'pay' ? (value ? parseFloat(value) : '') : value;
    setForms(values);
  };

  const addProductForm = () => {
    setForms([...forms, { productName: '', category: '', qty: '', unit: '', pay: '', description: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', forms);
    localStorage.setItem('productForms', JSON.stringify(forms));
    navigate('/reference');
  };

  useEffect(() => {
    const storedForms = localStorage.getItem('productForms');
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto conta">
      <form onSubmit={handleSubmit} className="space-y-6">
        {forms.map((form, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-100 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Products</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="qty"
                value={form.qty || ''}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quantity (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <input
                type="text"
                name="unit"
                value={form.unit}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Kg,Liter,Foot,Piece"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Target Price (Per Unit)</label>
              <input
                type="number"
                name="pay"
                value={form.pay || ''}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter price per unit (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={(event) => handleInputChange(index, event)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product description"
                rows="3"
              ></textarea>
            </div>
          </div>
        ))}

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={addProductForm}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Product
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
