import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Role } from "../../models/role";
import Wrapper from "../../components/Wrapper"
import { SyntheticEvent } from "react";

const UserUpdate = () => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState(false);
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState([]);


  const { id } = useParams();
  const getId = () => {
    return id
  }

  useEffect(() => {
    const getRoleAndUser = async () => {
      try {
        const {data} = await axios.get('/roles');
        console.log(data);
        setRoles(data);
      } catch (e: any) {
        console.log('error:', e.message);
      }

      const id = getId();
      console.log('id:', id)

      try {
        const {data} = await axios.get(`/users/${id}`);
        console.log(data);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      } catch (e :any) {
        console.log('error:', e.message);
      }
    }
    getRoleAndUser();
  },[]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
      const response = await axios.put(`/users/${id}`, {
        email: email,
        first_name: firstName,
        last_name: lastName,
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
        <h1 className="h3 mb-3 fw-normal">Update User</h1>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" required
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="first name" required
              defaultValue={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="last name" required
            defaultValue={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="state">Role</label>
            <select className="form-control" id="state" required
              value={roleId}
              onChange={e => setRoleId(Number(e.target.value))}
            >
              {roles.map((r:Role) => {
                return (
                  <option key={r.id} value={r.id}>{r.name}</option>
                );
              })}
            </select>
          </div>

          <button className="btn btn-lg btn-primary" type="submit">Submit</button>
      </form>
    </Wrapper>
  );
}

export default UserUpdate