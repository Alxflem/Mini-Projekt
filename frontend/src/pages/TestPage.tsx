import React, { useState, useEffect } from "react";
import axios from "axios";

function TestPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/data");
                setProducts(response.data);
                console.log(response.data); // Add this line to log the data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(
                    (product: {
                        p_id: string;
                        name: string;
                        type: string;
                        price: number;
                        image: string;
                        production_date: string;
                        color: string;
                        condition: string;
                        available: boolean;
                        seller: string;
                    }) => (
                        <li key={product.p_id}>
                            <h2>{product.name}</h2>
                            <p>Type: {product.type}</p>
                            <p>Price: ${product.price}</p>
                            {product.image && <img src={product.image} alt={product.name} />}
                            <p>Production Date: {product.production_date}</p>
                            <p>Color: {product.color}</p>
                            <p>Condition: {product.condition}</p>
                            <p>Available: {product.available ? "Yes" : "No"}</p>
                            <p>Seller ID: {product.seller}</p>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
export default TestPage;
