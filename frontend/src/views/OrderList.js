import { useState, useEffect } from 'react';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import Repo from '../repositories';
import Headers from '../components/Header';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await Repo.orders.getAll(); // ดึงข้อมูลคำสั่งซื้อ
      console.log('Orders:', response); // ตรวจสอบข้อมูลที่ได้รับ
      setOrders(response.rows || []); // ตั้งค่า orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <Headers />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">รายการคำสั่งซื้อ</h2>
        {orders.length === 0 ? (
          <p>ยังไม่มีคำสั่งซื้อ</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li key={index} className="border p-4 rounded shadow">
                <h3 className="font-bold">คำสั่งซื้อ #{index + 1}</h3>
                <p>วันที่: {new Date(order.date).toLocaleDateString()}</p>
                <ul className="mt-2 space-y-2">
                  {order.product.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.product.name}</span>
                      <span>x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  ดูรายละเอียด
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderList;