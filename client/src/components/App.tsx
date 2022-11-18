import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard/Dashboard';
import SignIn from 'pages/Sign/SignIn';
import Register from 'pages/Register/Register';
import Cart from 'pages/Cart/Cart';
import Checkout from 'pages/Checkout/Checkout';
import Product from 'pages/Product/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confirm from 'pages/Confirm/Confirm';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={500} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-received' element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
