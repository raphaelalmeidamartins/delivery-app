import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppProvider from './context';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Manage from './pages/Manage';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/admin/manage" element={ <Manage /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" element={ <Checkout /> } />
        <Route path="/customer/orders" element={ <Orders /> } />
        <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        {/* É o mesmo componente da tela de pedidos do cliente, diferenciar por meio de props */}
        <Route path="/seller/orders" element={ <Orders /> } />
        <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
      </Routes>
    </AppProvider>
  );
}

export default App;
