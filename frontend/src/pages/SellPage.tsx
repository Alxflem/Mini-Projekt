import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { useUser } from '../components/UserContext';
import Header from "../components/Header";

const SellPage = () => {
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [available, setAvailable] = useState(false);
  const [seller, setSeller] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useUser();



  useEffect(() => {
    // Fetch product types from API
    axios
      .get("http://127.0.0.1:5000/api/types")
      .then((response) => setType(response.data))
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  useEffect(() => {
    console.log("User data in SellPage:", user); // Debugging line
    if (user) {
      setSeller(user?.email);
    }
  }, [user]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = parseInt(event.target.value);
    setType(selectedType.toString());
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const productData = {
      name: productName,
      type: parseInt(type),
      price: parseFloat(price),
      image: imageUrl,
      production_date: productionDate,
      color: color,
      condition: condition,
      seller: seller
    };


    try {
      // Replace this with the actual URL of your Python API endpoint
      await axios.post("http://127.0.0.1:5000/api/add_product", productData);
      setSuccess("Product added successfully!");
      setError("");
    } catch (error) {
      setError("Failed to add product.");
      setSuccess("");
    }
  };

  return (
    <div
      id="maindiv"
      className="h-screen w-screen flex items-center justify-center"
    >
      <div id="centerdiv " className="text-center p-10 w-full max-w-3xl">
        <h1 className="py-10 text-4xl">Sell a Product</h1>
        <div className="bg-slate-300 border border-2 border-gray-500 p-10 rounded-xl shadow-sm w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="productName">
                Product Name
              </label>
              <input
                className="border border-black p-2 w-full"
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="type">
                Type
              </label>
              <select
                className="border border-black p-2 w-full"
                id="type"
                name="type"
                value={type}
                onChange={handleTypeChange}
              >
                <option value="0">Select Type</option>
                <option value="1">Electronics</option>
                <option value="2">Office</option>
                <option value="3">Clothing</option>
              </select>
            </div>
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="price">
                Price
              </label>
              <input
                className="border border-black p-2 w-full"
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                className="border border-black p-2 w-full"
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            {imageUrl && (
              <div className="flex flex-col items-center">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="border border-black p-2 max-w-full max-h-48"
                />
              </div>
            )}
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="productionDate">
                Production Date
              </label>
              <input
                className="border border-black p-2 w-full"
                type="date"
                id="productionDate"
                name="productionDate"
                value={productionDate}
                onChange={(e) => setProductionDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="color">
                Color
              </label>
              <select
                className="border border-black p-2 w-full"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="">Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Silver">Silver</option>
              </select>
            </div>
            <div className="flex flex-col items-center">
              <label className="px-2" htmlFor="condition">
                Condition
              </label>
              <select
                className="border border-black p-2 w-full"
                id="condition"
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Good">Good</option>
                <option value="Mint">Mint</option>
                <option value="Garbage">Garbage</option>
              </select>
            </div>

            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <button
              className="h-10 w-full border border-black rounded-xl hover:bg-slate-200 hover:shadow-xl"
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
