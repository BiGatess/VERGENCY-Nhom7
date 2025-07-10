import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating'; 

const API_URL = 'http://localhost:5000'; 

const ProductCard = ({ product }) => {
  const price = product.price || 0;
  const priceBeforeDiscount = product.priceBeforeDiscount || 0;

  const discountPercentage = priceBeforeDiscount > price
    ? Math.round(((priceBeforeDiscount - price) / priceBeforeDiscount) * 100) 
    : 0;

  const imageUrl = product.images && product.images.length > 0 
    ? `${API_URL}${product.images[0]}` 
    : '/default-placeholder.jpg'; 

  return (
    <div className={`card ${product.countInStock === 0 ? 'sold-out' : ''}`}>
      <div className="card-image-container">
        <Link to={`/product/${product._id}`}>
          <img 
            className="product-image" 
            src={imageUrl} 
            alt={product.name} 
          />
        </Link>
        
        {discountPercentage > 0 && product.countInStock > 0 && (
          <div className="sale-tag">-{discountPercentage}%</div>
        )}
        
        {product.countInStock === 0 && (
          <div className="sold-out-overlay">
              <span>HẾT HÀNG</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <p className="brand">{product.category?.name || 'VERGENCY'}</p> 
        
        <h3>
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        
        <Rating value={product.rating} text={`${product.numReviews} đánh giá`} />

        <div className="price-container">
          <span className="price">{price.toLocaleString('vi-VN')}₫</span>
          
          {discountPercentage > 0 && (
            <span className="original-price">
              {priceBeforeDiscount.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;