import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import UserList from "./views/UserList";
import CreateUser from "./views/CreateUser";
import ShopProduct from "./views/ShopProduct";
import OrderList from "./views/OrderList";
import OrderDetail from "./views/OrderDetail";

function App() {
  return (
    <div>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<UserList/>} />
          <Route path='/create' element={<CreateUser/>} />
          <Route path='/product' element={<ShopProduct/>}/>
          <Route path='/order' element={ <OrderList/>} />
          <Route path="/order/:order_id" element={<OrderDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;