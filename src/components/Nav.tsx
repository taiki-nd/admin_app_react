import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";

export const Nav = () => {

  const [user, setUser] = useState(new User());

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await axios.get('/user');
        console.log(data)
        setUser(new User(
          data.id,
          data.first_name,
          data.last_name,
          data.email,
        ));
      } catch (e :any) {
        console.log('error:', e.message)
      }
    } 
    getUser()
  }, []);

  const logout = async () => {
    console.log('start logout')
    try {
      const response = await axios.post('/logout', {});
      console.log(response.data)
    } catch (e :any) {
      console.log('error:', e.message)
    }
  }

  return(
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Company name</a>
        <div className="nav-item text-nowrap">
          <Link className="nav-link text-white" to="/profile">{user.name}</Link>
        </div>
        <div className="nav-item text-nowrap">
          <Link className="nav-link text-white" to="/login"
            onClick={logout}
          >Sign out</Link>
        </div>
    </nav>
  );
}