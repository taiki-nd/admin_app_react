import { Nav } from './Nav';
import { Menu } from './Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Wrapper = (props: any) => {

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data} = await axios.get('/user');
        console.log(data)
      } catch (e :any) {
        console.log('error:', e.message)
        setRedirect(true)
      }
    } 
    getUser()
  }, []);

  if (redirect) {
    return <Navigate to='/login'/>
  }

  return(
    <div className="App">
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>  
      </div>
    </div>
  );
}


export default Wrapper;