// 📁 src/views/CartPage.jsx
import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Header from '../components/Header';

function ShopProduct() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.product._id === product._id);
    if (existing) {
      const updatedCart = cart.map(item =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // ลบสินค้าที่ตำแหน่ง index
    setCart(updatedCart); // อัพเดต cart
  };


  return (
    <div className="p-4">
      <Header/>
      <h1 className="text-2xl font-bold mb-4">🛒 ระบบตะกร้าสินค้า</h1>
      <ProductList addToCart={addToCart}/>
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ShopProduct;
