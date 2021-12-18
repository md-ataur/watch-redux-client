import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home/Home';
import Header from './pages/Shared/Header/Header';
import Footer from './pages/Shared/Footer/Footer';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import AddProduct from './pages/Dashboard/Admin/AddProduct/AddProduct';
import ManageProducts from './pages/Dashboard/Admin/ManageProducts/ManageProducts';
import Login from './pages/Login/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watches" element={<Products />} />
          <Route path="/details/:pid" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <Dashboard />}>
            <Route path="addproduct" element={
              <AddProduct />}>
            </Route>
            <Route path="manageproducts" element={
              <ManageProducts />}>
            </Route>
          </Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div >
  );
}

export default App;
