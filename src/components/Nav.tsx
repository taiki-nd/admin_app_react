import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const Nav = () => {

  const [user, setUser] = useState(
    {
      'first_name': "",
      'last_name': "",
    },
  );
  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await axios.get('/user');
        console.log(data)
        setUser(data)
      } catch (e :any) {
        console.log('error:', e.message)
      }
    }
    getUser()
  }, [])

  return(
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Company name</a>
        <div className="nav-item text-nowrap">
          <a className="nav-link text-white" href="/">{user?.first_name} {user?.last_name}</a>
        </div>
        <div className="nav-item text-nowrap">
          <a className="nav-link text-white" href="/">Sign out</a>
        </div>
    </nav>
  );
}