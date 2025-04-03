import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import UserList from "./views/UserList";
import CreateUser from "./views/CreateUser";
import ShopProduct from "./views/ShopProduct";

function App() {
  return (
    <div>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<UserList/>} />
          <Route path='/create' element={<CreateUser/>} />
          <Route path='/product' element={<ShopProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;