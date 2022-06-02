import axios from 'axios';
import { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
    const response = await axios.post('/login', {
      email: email,
      password: password,
    });

    console.log(response.data)

    setState(true)
    } catch (e :any) {
      console.log('error:', e.message)
    }
  }

  if (state) {
    return <Navigate to='/'/>
  }

  return(
    <main className="form-signin">
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>

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