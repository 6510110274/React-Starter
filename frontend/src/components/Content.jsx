import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalDialog, Typography, FormControl, Input, DialogActions} from "@mui/joy";
import Repo from "../repositories";


function Content({ users, onActionSuccess}) {
    const [editUser, setEditUser] = useState(null);
    const [open, setOpen] = useState(false);

    const confirmDelete = (id) => {
        Swal.fire({
          title: 'แน่ใจหรือไม่?',
          text: "คุณต้องการลบพนักงานคนนี้ใช่หรือไม่",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ใช่, ลบเลย!',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            handleDeleteUser(id);
            Swal.fire('ลบแล้ว!', 'ข้อมูลถูกลบเรียบร้อย', 'success');
          }
        });
      };

    const handleDeleteUser = async (userId) => {
        try {
          await Repo.users.delete(userId);
          onActionSuccess();
        }catch (error) {
          alert(error?.message);
          console.error("Error", error?.message);
        }
    };

    const confirmUpdateUser = async () => {
        try {
        await Repo.users.update(editUser._id, editUser);
        setOpen(false);
        onActionSuccess(); // รีเฟรชรายการ

        // ✅ แสดง SweetAlert แจ้งผลลัพธ์
        Swal.fire({
            title: 'สำเร็จ!',
            text: 'แก้ไขข้อมูลพนักงานเรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonText: 'ตกลง'
        });

        } catch (error) {
        alert(error?.message);
        }
    }
    const handleUpdateUser = async (userId) => {
        try {
          const user = await Repo.users.get(userId);
          setEditUser(user);
          setOpen(true); // เปิด Modal
        }catch (error) {
          alert(error?.message);
          console.error("Error", error?.message);
        }
    }

    useEffect(() => {
    },[]);
    return (
    <div>
        <h3 className='font-bold'>User List</h3>
        <Table>
        <thead>
            <tr>
            <th>ลำดับที่</th>
            <th>ชื่อ</th>
            <th>แผนก</th>
            <th>ดำเนินการ</th>
            </tr>
        </thead>
        <tbody>
        {users?.map((user, index) => (
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{user?.name}</td>
            <td>{user?.department}</td>
            <td>
                <Button 
                color='danger'
                onClick={()=>confirmDelete(user?._id)}
                sx={{ mr: 1 }}
                >
                    ลบ
                </Button>
                <Button
                color='primary'
                onClick={()=>handleUpdateUser(user?._id)}
                >
                    แก้ไข
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
        </Table>
        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
            <Typography>แก้ไขข้อมูล</Typography>
            <FormControl>
            <Input
                value={editUser?.name || ""}
                onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
                }
                placeholder="ชื่อ"
            />
            </FormControl>
            <FormControl sx={{ mt: 1 }}>
            <Input
                value={editUser?.department || ""}
                onChange={(e) =>
                setEditUser({ ...editUser, department: e.target.value })
                }
                placeholder="แผนก"
            />
            </FormControl>
            <DialogActions>
            <Button
                onClick={confirmUpdateUser}
                >
                บันทึก
            </Button>
            <Button variant="soft" color="neutral" onClick={() => setOpen(false)}>
                ยกเลิก
            </Button>
            </DialogActions>
        </ModalDialog>
        </Modal>
    </div>
    );
};

export default Content;
