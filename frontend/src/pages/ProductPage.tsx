import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header cartItems={[]} removeFromCart={() => {}} />
      <div className=" h-screen w-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl py-5">{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p className="py-2">Type: {product.type}</p>
        <p className="py-2">Price: ${product.price}</p>
        <p className="py-2">Color: {product.color}</p>
        <p className="py-2">Condition: {product.condition}</p>
        <p className="">
          Production Date:{" "}
          {new Date(product.production_date).toLocaleDateString()}
        </p>
      </div>
    </>
    
  );
};

export default ProductPage;
