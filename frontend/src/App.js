import React, {useState,useEffect} from "react";
import { Card, CardContent, Input } from "@mui/joy";
import Content from "./components/Content";
import Repo from "./repositories";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users,setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await Repo.users.getAll();
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
  return (
    <div>
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
        <Content props={users}/>
      </Card>
    </div>
  );
}

export default App;