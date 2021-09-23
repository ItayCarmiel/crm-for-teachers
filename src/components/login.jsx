import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";	

import axios from 'axios'

const Login=(props)=>
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [logMsg, setLogMsg] = useState("")
	const [openHome, setOpenHome] = useState(false);
	const [name, setName] = useState("");
	let history = useHistory();


		useEffect(() => {
			if(name.length < 1) {
				return;
			}
			console.log(name);
			setOpenHome(true);
			history.push("/login");
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
<div className="logform">
		<inForm action="#">
			<input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
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

)}
export default Login;
