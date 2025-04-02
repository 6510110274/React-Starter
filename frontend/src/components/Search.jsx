import React, {useState} from "react";
import { Card, CardContent, Input } from "@mui/joy";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
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
    </div>
  );
}
}