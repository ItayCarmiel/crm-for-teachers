import React, { useState } from 'react';
import SignUp from './signup'

import axios from 'axios'

const Login=()=>
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [msg, setMsg] = useState("");
  

    return(
<div >
    <div className="head">
      <header>Peacher</header>
     <second>You're personal teacher for private lessons</second>
      </div>
	<div>
		<inForm action="#">
			<h1>Sign in</h1>
			<input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</inForm>
	</div>
</div>

)}
export default Login;
