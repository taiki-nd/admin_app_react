import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Role } from "../../models/role";
import Wrapper from "../../components/Wrapper"
import { SyntheticEvent } from "react";

const UserCreate = () => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(false);
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRole = async () => {
      try {
        const {data} = await axios.get('/roles');
        console.log(data);
        setRoles(data);
      } catch (e: any) {
        console.log('error:', e.message);
      }
    }
    getRole();
  },[]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
      const response = await axios.post('/users', {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        role_id: roleId,
      });

      console.log(response.data)

      setState(true)
    } catch (e :any) {
      console.log('error:', e.message, e.config.url)
    }
  }

  if (state) {
    return <Navigate to='/users'/>
  }

  return(
    <Wrapper>
      <form className="needs-validation" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Add User</h1>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" required
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="first name" required
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="last name" required
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="state">Role</label>
            <select className="form-control" id="state" required
              onChange={e => setRoleId(Number(e.target.value))}
            >
              {roles.map((r:Role) => {
                return (
                  <option key={r.id} value={r.id}>{r.name}</option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-lg btn-primary" type="submit">Submit</button>
      </form>
    </Wrapper>
  );
}

export default UserCreate