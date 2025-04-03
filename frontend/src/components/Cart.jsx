// 📁 src/components/Cart.jsx
import { Button } from '@mui/joy';
import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">ตะกร้าสินค้า</h2>
      {cart.length === 0 ? (
        <p>ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center border p-2 rounded">
              <span>{item.product.name} x {item.quantity}</span>
              <div className="flex items-center ml-auto space-x-4">
                <span>{item.product.price * item.quantity} บาท</span>
                <Button color='danger' onClick={() => removeFromCart(index)}>ลบ</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 font-bold">รวมทั้งหมด: {total} บาท</div>
    </div>
  );
};

export default Cart;
