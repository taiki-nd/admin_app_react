import axios from 'axios';
import Wrapper from '../../components/Wrapper';
import { useEffect } from "react";
import { useState } from 'react';
import { User } from '../../models/user';
import { Link } from 'react-router-dom';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const {data} = await axios.get(`/users?page=${page}`);
        console.log('users', data)
        setUsers(data.data)
        setLastPage(data.meta.last_page)
      } catch (e :any) {
        console.log('error:', e.message);
      }
    }
    getAllUsers();
  }, [page]);

  const next = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  }

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const deleteUser = async (id: number) => {
    if (window.confirm(`Are you sure you  want to delete this User?: id = ${id}`)){
      await axios.delete(`users/${id}`);
      setUsers(users.filter((u: User) => u.id !== id));
    }
  }

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
                  <td>{user.role.name}</td>
                  <td>
                    <div className='btn-group mr-2'>
                      <a href="/" className='btn btn-sm btn-outline-danger' onClick={() => deleteUser(user.id)}>Delete</a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="/" onClick={prev}>Previous</a></li>
          <li className="page-item"><a className="page-link" href="/" onClick={next}>Next</a></li>
        </ul>
      </nav>
    </Wrapper>
  );
}