import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import UserList from "./views/UserList";
import CreateUser from "./views/CreateUser";

function App() {
  return (
    <div>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<UserList/>} />
          <Route path='/create' element={<CreateUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;