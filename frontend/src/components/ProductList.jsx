// 📁 src/components/ProductList.jsx
import React from 'react';
import { Button } from '@mui/joy';

const dummyProducts = [
  { _id: '1', name: 'เสื้อแมว', price: 200 },
  { _id: '2', name: 'ปลอกคอหมา', price: 150 },
  { _id: '3', name: 'ของเล่นแมว', price: 100 },
];

const ProductList = ({ addToCart }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">สินค้า</h2>
      <ul className="space-y-2">
        {dummyProducts.map(product => (
          <li key={product._id} className="flex justify-between items-center border p-2 rounded">
            <span>{product.name} - {product.price} บาท</span>
            <Button size="sm" onClick={() => addToCart(product)}>เพิ่ม</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
