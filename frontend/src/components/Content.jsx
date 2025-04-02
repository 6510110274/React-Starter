import React, { useEffect } from 'react';
import { Table,Button } from "@mui/joy";
import Repo from "../repositories";

function Content({ users, onDeleteSuccess}) {

    const handleDeleteUser = async (userId) => {
        try {
          await Repo.users.delete(userId);
          onDeleteSuccess();
        }catch (error) {
          alert(error?.message);
          console.error("Error", error?.message);
        }
    };

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
                <Button color='danger' onClick={()=>handleDeleteUser(user?._id)}>ลบ</Button>
            </td>
            </tr>
        ))}
        </Table>
    </div>
    );
};

export default Content;
