import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';
import Repo from '../repositories';
import Headers from '../components/Header';

const OrderDetail = () => {
  const { order_id } = useParams(); // ดึง order_id จาก URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrderDetail = async () => {
    try {
      const response = await Repo.orders.get(order_id); // ดึงข้อมูลคำสั่งซื้อ
      setOrder(response); // ตั้งค่า order
    } catch (error) {
      console.error('Error fetching order detail:', error);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [order_id]);

  if (!order) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  // คำนวณราคารวมทั้งหมด
  const totalPrice = order.product.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className='p-4'>
      <Headers />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">รายละเอียดคำสั่งซื้อ</h2>
        <p className="text-lg mb-4">
          <strong>วันที่:</strong> {new Date(order.date).toLocaleDateString()}
        </p>
        <ul className="mt-4 space-y-4">
          {order.product.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border p-4 rounded shadow"
            >
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  ราคา: {item.product.price} บาท
                </p>
              </div>
              <div className="text-right">
                <p>x {item.quantity}</p>
                <p className="font-bold">
                  รวม: {item.product.price * item.quantity} บาท
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 p-4 border-t font-bold text-lg">
          ราคารวมทั้งหมด: {totalPrice} บาท
        </div>
        <Button
          className="mt-4"
          color="primary"
          onClick={() => navigate('/order')}
        >
          กลับไปยังรายการคำสั่งซื้อ
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;