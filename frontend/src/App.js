import React, {useState,useEffect} from "react";
import { Card, CardContent, Input } from "@mui/joy";
import Content from "./components/Content";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [starWarPeople, setStarWarPeople] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://swapi.dev/api/people`);
      setStarWarPeople(res?.data?.results || []);
      console.log("People", res?.data?.results);
    } catch (error) {
      console.error("Error", error?.message);
    }
  };

 useEffect(() => {
    fetchData();
    console.log("Star War People", starWarPeople);
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
        <Content starWarPeople={starWarPeople}/>
      </Card>
    </div>
  );
}

export default App;