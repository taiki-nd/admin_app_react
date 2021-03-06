import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import UserCreate from './pages/users/UserCreate';
import UserUpdate from './pages/users/UserUpdate';
import Roles from './pages/roles/Roles';
import RolesCreate from './pages/roles/RolesCreate';
import RolesUpdate from './pages/roles/RolesUpdate';
import Products from './pages/products/produts';
import ProductsCreate from './pages/products/ProductsCreate';
import ProductsUpdate from './pages/products/ProductsUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/users/create' element={<UserCreate />}/>
        <Route path='/users/edit/:id' element={<UserUpdate />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='roles' element={<Roles/>}/>
        <Route path='/roles/create' element={<RolesCreate />}/>
        <Route path='/roles/edit/:id' element={<RolesUpdate />}/>
        <Route path='products' element={<Products/>}/>
        <Route path='products/create' element={<ProductsCreate/>}/>
        <Route path='/products/edit/:id' element={<ProductsUpdate />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
