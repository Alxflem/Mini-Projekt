import React, { useState } from 'react';
import axios from 'axios';

const SellPage = () => {
  const [productName, setProductName] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const productData = {
      productName,
      condition,
      price,
      imageUrl,
    };

    try {
      // Replace this with the actual URL of your Python API endpoint
      const response = await axios.post('http://localhost:8000/api/products', productData);
      setSuccess('Product added successfully!');
      setError('');
    } catch (error) {
      setError('Failed to add product.');
      setSuccess('');
    }
  };

  return (
    <div id="maindiv" className="h-screen w-screen flex items-center justify-center">
      <div id="centerdiv" className="text-center p-10 w-full max-w-3xl" >
        <h1 className="py-10 text-4xl">Sell a Product</h1>
        <div className="bg-slate-300 border border-2 border-gray-500 p-10 rounded-xl shadow-sm ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-4 w-full">
              <label className="px-2" htmlFor="productName">Product Name</label>
              <input
                className="border border-black p-2 w-3/4"
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center mb-4 w-full">
              <label className="px-2" htmlFor="condition">Condition</label>
              <input
                className="border border-black p-2 w-3/4"
                type="text"
                id="condition"
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center mb-4 w-full">
              <label className="px-2" htmlFor="price">Price</label>
              <input
                className="border border-black p-2 w-3/4"
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center mb-4 w-full">
              <label className="px-2" htmlFor="imageUrl">Image URL</label>
              <input
                className="border border-black p-2 w-3/4"
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            {imageUrl && (
              <div className="flex flex-col items-center mb-4 w-full">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="border border-black max-w-full max-w-48"
                />
              </div>
            )}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <button
              className="h-10 w-20 border border-black rounded-xl hover:bg-slate-200 hover:shadow-xl"
              type="submit"
            >
              Sell
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
