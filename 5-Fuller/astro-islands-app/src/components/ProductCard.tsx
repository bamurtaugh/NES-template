// NES Demo: Try edits from README Scenario 2 to see Next Edit Suggestions in action

import React, { useState } from 'react';
import type { ProductData, CartItem } from '../types';

interface ProductCardProps {
  product: ProductData;
  onAddToCart?: (item: CartItem) => void;
  showPrice?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  showPrice = true 
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        productId: product.id,
        quantity: quantity
      });
    }
  };

  const getStockStatus = () => {
    if (product.inStock) {
      return 'In Stock';
    } else {
      return 'Out of Stock';
    }
  };

  const getCategoryColor = () => {
    if (product.category === 'electronics') {
      return 'bg-blue-100 text-blue-800';
    } else if (product.category === 'clothing') {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${getCategoryColor()}`}>
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>

      {showPrice && (
        <div className="mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      )}

      <div className="mb-4">
        <span className={`inline-block px-2 py-1 rounded text-sm ${
          product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {getStockStatus()}
        </span>
      </div>

      {product.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {product.inStock && (
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-20 px-2 py-1 border rounded"
          />
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;