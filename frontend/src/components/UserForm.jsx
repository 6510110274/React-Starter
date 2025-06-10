import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Input, Button, LinearProgress, Typography, Box } from "@mui/joy";
import { useState } from "react";
import Repo from "../repositories";

function UserForm() {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // สำหรับแสดงตัวอย่างภาพ
  const navigate = useNavigate();

  const handleCreateUser = async (data) => {
    setLoading(true);
    try {
      await Repo.users.create(data);
      setLoading(false);

      // SweetAlert: แจ้งว่าเพิ่มสำเร็จ
      await Swal.fire({
        title: "สำเร็จ!",
        text: "สร้างพนักงานเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      });

      navigate("/"); // ไปหน้าแรกหลังจากกด "ตกลง"
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error?.message || "ไม่สามารถสร้างพนักงานได้",
        icon: "error",
      });
      console.error("Error", error?.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // ตั้งค่าตัวอย่างภาพ
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    <Box className="lg:w-3/4 mx-auto mt-8">
      <Typography level="h4" className="font-bold text-center mb-4">
        เพิ่มพนักงานใหม่
      </Typography>
      <Card variant="outlined" className="shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit(handleCreateUser)}>
            <Box className="mb-4">
              <Typography level="body1" className="font-semibold mb-1">
                ชื่อ
              </Typography>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="ชื่อพนักงาน" fullWidth />
                )}
              />
            </Box>
            <Box className="mb-4">
              <Typography level="body1" className="font-semibold mb-1">
                แผนก
              </Typography>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="แผนก" fullWidth />
                )}
              />
            </Box>
            <Box className="mb-4">
              <Typography level="body1" className="font-semibold mb-1">
                อัปโหลดรูปภาพ
              </Typography>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                fullWidth
              />
              {imagePreview && (
                <Box className="mt-4 text-center">
                  <Typography level="body2" className="mb-2">
                    ตัวอย่างรูปภาพ:
                  </Typography>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover mx-auto rounded-full border"
                  />
                </Box>
              )}
            </Box>
            <Box className="text-center">
              <Button type="submit" color="primary" size="lg">
                บันทึก
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserForm;