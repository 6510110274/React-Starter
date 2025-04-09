import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2
import Repo from '../repositories';

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePayment = async () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ตะกร้าสินค้าว่าง',
        text: 'กรุณาเพิ่มสินค้าในตะกร้าก่อนทำการชำระเงิน',
      });
      return;
    }

    Swal.fire({
      title: 'ยืนยันการซื้อ?',
      text: `คุณต้องการซื้อสินค้าทั้งหมด ${cart.length} รายการหรือไม่?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const orderData = {
            date: new Date(),
            product: cart.map(item => ({
              product: item.product._id,
              quantity: item.quantity,
            })),
          };

          await Repo.orders.create(orderData); // สร้างคำสั่งซื้อ
          Swal.fire({
            icon: 'success',
            title: 'การซื้อสำเร็จ!',
            text: 'ขอบคุณสำหรับการสั่งซื้อของคุณ',
          });
          navigate('/order'); // นำทางไปยังหน้า OrderList
        } catch (error) {
          console.error('Error creating order:', error);
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถทำการสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง',
          });
        }
      }
    });
  };

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
                <Button color="danger" onClick={() => removeFromCart(index)}>ลบ</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 font-bold">รวมทั้งหมด: {total} บาท</div>
      {cart.length > 0 && (
        <Button className="mt-4" color="success" onClick={handlePayment}>
          Payment
        </Button>
      )}
    </div>
  );
};

export default Cart;