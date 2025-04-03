import { useForm,Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Card, CardContent, Input, Button, LinearProgress } from "@mui/joy";
import { useState } from "react";
import Repo from "../repositories";

function UserForm( ){
  const { control,handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (data) => {
    setLoading(true);
    try {
      await Repo.users.create(data);
      setLoading(false);
      alert("Create User Success");
    } catch (error) {
      alert(error?.message);
      console.error("Error", error?.message);
    }
  }
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
        <Link
          to="/"
          aria-current="page"
          >
            <Button type="submit">บันทึก</Button>
        </Link>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}

export default UserForm;