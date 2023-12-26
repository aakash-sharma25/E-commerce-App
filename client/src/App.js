import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
// import Introduction from './pages/Introduction';

function App() {
  return (
  <Layout>
    <Routes>
      {/* <Route path='/' element={<Introduction/>} /> */}
      <Route path='/' element={<HomePage/>} />
      <Route path='/product/:slug' element={<ProductDetails/>} />
      <Route path='/search' element={<Search/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/category/:slug' element={<CategoryProduct/>} />
      
      <Route 

          path='/dashboard' element={<Private/>} > 
      <Route path='user' element={<Dashboard/>} />
      <Route path="user/orders" element={<Orders />} />
      <Route path="user/profile" element={<Profile />} />

      </Route>

      <Route path='/dashboard' element={<AdminRoute/>} >
        <Route path='admin' element={<AdminDashboard/>} />
        <Route path='admin/create-category' element={<CreateCategory/>} />
        <Route path='admin/create-product' element={<CreateProduct/>} />
        <Route path='admin/product/:slug' element={<UpdateProduct/>} />
        <Route path='admin/products' element={<Products/>} />
        <Route path='admin/users' element={<Users/>} />
        <Route path='admin/orders' element={<AdminOrders/>} />
      </Route>

     
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/about' element={<About/>} /> 
      <Route path='/contact' element={<Contact/>} /> 
      <Route path='/category' element={<Contact/>} />
      <Route path='/policy' element={<Policy/>} /> 
      <Route path='*' element={<PageNotFound/>} />
    </Routes>

  </Layout>
  );
}

export default App;
