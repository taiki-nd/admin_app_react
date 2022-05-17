import { useState } from 'react';
import { text } from 'stream/consumers';

const Login = () => {

  const [text, setText] = useState("hello")

  return(
    <div>
      <h1>{text}</h1>
      <input type={"text"} placeholder="some text" onChange={e => setText(e.target.value)} />
    </div>
  )
}

export default Login