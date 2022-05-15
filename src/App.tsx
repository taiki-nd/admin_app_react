import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import { Menu } from './components/Menu'
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/users' element={<Users />}/>
            </Routes>
          </main>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
