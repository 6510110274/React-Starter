// 📁 src/components/ProductList.jsx
import { useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import Repo from '../repositories';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await Repo.products.getAll();
  
      if (!response.rows) {
        throw new Error("API Response is null or undefined");
      }
  
      setProducts(response.rows); // ตั้งค่า products ด้วย response.rows
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }
  , []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">สินค้า</h2>
      <ul className="space-y-2">
      {products && products.length > 0 ? (
        products.map(product => (
          <li key={product._id} className="flex justify-between items-center border p-2 rounded">
            <span>{product.name} - {product.price} บาท</span>
            <Button size="sm" onClick={() => addToCart(product)}>เพิ่ม</Button>
          </li>
        ))
      ) : (
        <p>ไม่มีสินค้า</p>
      )}
      </ul>
    </div>
  );
};

export default ProductList;
