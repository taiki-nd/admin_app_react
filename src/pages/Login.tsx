import axios from 'axios';
import { SyntheticEvent } from 'react';
import { useState } from 'react';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:8000/api/login', {
      email: email,
      password: password,
    }, {
      withCredentials: true
    });

    console.log(response.data)
  }

  return(
    <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input type="email" className="form-control" placeholder="Email" required
              onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
              onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
  );
}

export default Login