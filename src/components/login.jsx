import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import axios from 'axios'

const Login=(props)=>
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [logMsg, setLogMsg] = useState("")
	const [openHome, setOpenHome] = useState(false);
	const [name, setName] = useState("");


		useEffect(() => {
			if(name.length < 1) {
				return;
			}
			console.log(name);
			setOpenHome(true);
		  }, [name]);
  
	const handleLogin =()=> {
		axios.post('http://localhost:8004/login', {
			email:email,
			password:password,
		}).then(response=> {
			props.updateLogMsg(response.data.status);
			if(response.data.flag){
				setName(response.data.id[0].FullName);
			
			}
		})
	  }
	
    return(
<div >
	<div>
		<inForm action="#">
			<h1>Sign in</h1>
			<input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
			<a href="#">Forgot your password?</a>
			<button onClick={handleLogin}>
			Sign In
			</button>
			{logMsg}
		</inForm>
		{openHome && <Redirect to={{
            pathname: '/home',
            name: name
        }}/>}
	</div>
</div>

)}
export default Login;
