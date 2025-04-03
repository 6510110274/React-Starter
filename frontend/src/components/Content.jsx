import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalDialog, Typography, FormControl, Input, DialogActions} from "@mui/joy";
import Repo from "../repositories";

function Content({ users, onActionSuccess}) {
    const [editUser, setEditUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleDeleteUser = async (userId) => {
        try {
          await Repo.users.delete(userId);
          onActionSuccess();
        }catch (error) {
          alert(error?.message);
          console.error("Error", error?.message);
        }
    };

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
        {users?.map((user, index) => (
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{user?.name}</td>
            <td>{user?.department}</td>
            <td>
                <Button 
                color='danger'
                onClick={()=>handleDeleteUser(user?._id)}
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
                onClick={async () => {
                try {
                    await Repo.users.update(editUser._id, editUser);
                    setOpen(false);
                    onActionSuccess(); // รีเฟรชรายการ
                } catch (error) {
                    alert(error?.message);
                }
                }}
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
