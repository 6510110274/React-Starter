import { useForm,Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ใช้ navigate แทน Link
import { Card, CardContent, Input, Button, LinearProgress } from "@mui/joy";
import { useState } from "react";
import Repo from "../repositories";

function UserForm( ){
  const { control,handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //เตรียม navigate ไว้ใช้

  const handleCreateUser = async (data) => {
    setLoading(true);
    try {
      await Repo.users.create(data);
      setLoading(false);
  
      // ✅ SweetAlert: แจ้งว่าเพิ่มสำเร็จ
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'สร้างพนักงานเรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      });
  
      navigate("/"); // ✅ ไปหน้าแรกหลังจากกด "ตกลง"
      
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: error?.message || 'ไม่สามารถสร้างพนักงานได้',
        icon: 'error',
      });
      console.error("Error", error?.message);
    }
  };
  
  if(loading) {
    return(
      <div>
        <LinearProgress/>
      </div>
      );
    }
  return (
    <div className='lg:w-3/4 '>
    <div className='my-1 font-semibold text-lg'>เพิ่มพนักงานใหม่</div>
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(handleCreateUser)} >
          <div>ชื่อ</div>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder='ชื่อพนักงาน' />
            )}
          />
        <div>แผนก</div>
        <Controller
           name='department'
           control={control}
           render={({ field }) => (
           <Input {...field} placeholder='แผนก' />
             )}
        />
        <div>
          <Button type="submit">บันทึก</Button>
        </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}

export default UserForm;