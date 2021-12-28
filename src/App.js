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
import AuthProvider from './context/AuthProvider';
import MakeAdmin from './pages/Dashboard/Admin/MakeAdmin/MakeAdmin';
import PrivateRoute from './pages/Login/PrivateRoute/PrivateRoute';
import MyOrders from './pages/Dashboard/User/MyOrders/MyOrders';
import ManageOrders from './pages/Dashboard/Admin/ManageOrders/ManageOrders';
import AdminRoute from './pages/Login/AdminRoute/AdminRoute';
import UserRoute from './pages/Login/UserRoute/UserRoute';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watches" element={<Products />} />
            <Route path="/details/:pid" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>}>
              <Route path="addproduct" element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>}>
              </Route>
              <Route path="manageproducts" element={
                <AdminRoute>
                  <ManageProducts />
                </AdminRoute>}>
              </Route>
              <Route path="manageorders" element={
                <AdminRoute>
                  <ManageOrders />
                </AdminRoute>}>
              </Route>
              <Route path="makeadmin" element={
                <AdminRoute>
                  <MakeAdmin />
                </AdminRoute>}>
              </Route>
              <Route path="myorders" element={
                <UserRoute>
                  <MyOrders />
                </UserRoute>}>
              </Route>
            </Route>
          </Routes>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div >
  );
}

export default App;
