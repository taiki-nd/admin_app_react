import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const {data} = await axios.get('/roles');
        console.log(data);
        setRoles(data);
      } catch (e: any) {
        console.log('error:', e.message);
      }
    }
    getRoles();
  },[]);

  return(
    <Wrapper>
      <div className='p-3'>
        <Link to='/users/create' className="btn btn-sm btn-outline-primary">Add</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                  <div className='btn-group mr-2'>
                      <a href="/" className='btn btn-sm btn-outline-danger m-1'>Delete</a>
                      <Link to={`/users/edit/${role.id}`} className='btn btn-sm btn-outline-warning m-1'>Edit</Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Roles;