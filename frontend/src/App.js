import React, {useState,useEffect} from "react";
import { Card, CardContent, Input } from "@mui/joy";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [starWarPeople, setStarWarPeople] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/user`);
      setStarWarPeople(res?.data?.results || []);
      console.log("People", res?.data?.results);
    } catch (error) {
      console.error("Error", error?.message);
    }
  };

 useEffect(() => {
    fetchData();
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
      </Card>
      <div className='mx-4'>
          {starWarPeople?.map((eachPeople, index) => (
            <Card key={index} className='my-2'>
              <CardContent>
                <div className='flex'>
                  <div className='w-1/3'></div>
                  <div className='w-2/3'>
                    <li>Name: {eachPeople?.name}</li>
                    <li>Height: {eachPeople?.height}</li>
                    <li>Mass: {eachPeople?.mass}</li>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}

export default App;