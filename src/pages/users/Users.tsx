import axios from 'axios';
import Wrapper from '../../components/Wrapper';
import { useEffect } from "react";
import { useState } from 'react';
import { User } from '../../models/user';

export const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const {data} = await axios.get('/users');
        console.log('users', data.data)
        setUsers(data.data)
      } catch (e :any) {
        console.log('error:', e.message);
      }
    }
    getAllUsers();
  }, []);

  return(
    <Wrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return(
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td></td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
}