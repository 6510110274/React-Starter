import React from 'react';
import { Card, CardContent } from "@mui/joy";

function Content({ starWarPeople }) {
    return (
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
    );
};

export default Content;