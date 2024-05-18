import React from 'react';
import './ProductsPage.css';

interface Product {
  id: number; 
  imageUrl: string;
  title: string;
  price: string;
}

type ProductsProps = {
    products?: Product[]; 
};

const ProductsPage: React.FC<ProductsProps> = ({ products = [] }: ProductsProps) => {
    return (
    <div className="product-list-page">
      <header>
        <div className="container">
          <h1>Our Products</h1>
          <form action="#" className="search-form">
            <input type="text" placeholder="Search Products" />
            <button type="submit"><i className="fas fa-search"></i></button>
          </form>
        </div>
      </header>

      <main>
        <section className="product-grid">
          {products.map((product) => (
            <a key={product.id} href={`product/${product.id}`}>  {/* Replace with actual product link generation */}
              <div className="product-card">
                <img src={product.imageUrl} alt={`Product ${product.title}`} />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;