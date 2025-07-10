import React from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null; 
  }

  return (
    <div className="related-products-section">
      <h4>SẢN PHẨM LIÊN QUAN</h4>
      <div className="related-products-list">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="related-product-item">
            <img src={`${API_URL}${product.images[0]}`} alt={product.name} />
            <div className="related-product-info">
              <p className="name">{product.name}</p>
              <p className="price">{product.price.toLocaleString('vi-VN')}₫</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;