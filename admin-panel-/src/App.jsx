
import './App.css';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import { Routes, Route, } from "react-router-dom"
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newuser/NewUser';
import ProductLis from './pages/productList/ProductLis';
import Product from './pages/product/Product';
import Update from './pages/update/Update';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import { useSelector } from 'react-redux';
import UpdateProduct from './pages/updateProduct/UpdateProduct';
import NewProduct from './pages/newproduct/NewProduct';
import Loader from './components/loader/Loader';
function App() {
  const admin = useSelector((state) => state?.user?.user?.isAdmin);
  


  return (
    <>

      {<>
        {admin === true && <Topbar />}
        <div className='main_container'>
          {admin === true && <Sidebar />}

          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            <Route path='/' element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>

            } />
            <Route path='/user/:id' element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
            <Route path='/newuser' element={<NewUser />} />
            <Route path='/produclist' element={
              <ProtectedRoute>
                <ProductLis />
              </ProtectedRoute>
            } />
            <Route path='/product/:id' element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            } />
            <Route path='/update/:id' element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            } />
            <Route path='/updateproduct/:id' element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            } />
            <Route path='/newproduct' element={
              // <ProtectedRoute>
              <NewProduct />
              // </ProtectedRoute>
            } />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

          </Routes>

        </div>

      </>}
    </>
  );
}

export default App;