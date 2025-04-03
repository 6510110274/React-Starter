import React, {useState,useEffect} from "react";
import { Card, CardContent, Input, LinearProgress } from "@mui/joy";
import Content from "../components/Content";
import Repo from "../repositories";
import Header from "../components/Header";


function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users,setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await Repo.users.getAll({ name:searchTerm });
      setUsers(res?.rows || []);
      setLoading(false);
      console.log("User", res?.rows);
    } catch (error) {
      console.error("Error", error?.message);
    }
  };

 useEffect(() => {
    fetchData();
    console.log("Users", users);
  },[searchTerm]);
  if(loading) {
    return(
      <div>
        <LinearProgress/>
      </div>
      );
    }
  return (
    <div>
      <Header/>
      <Card>
        <CardContent>
          <div>Search Box</div>
          <Input
            placeholder='Input Some Search Word'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            You Search <span className='text-blue-500'>{searchTerm}</span>
          </div>
        </CardContent>
        <Content users={users} onActionSuccess={fetchData} />
      </Card>
    </div>
  );
}

export default UserList;