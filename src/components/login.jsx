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
	const [id, setId] = useState("");
	let history = useHistory();


		useEffect(() => {
			if(id < 1) {
				return;
			}
			setOpenHome(true);
			history.push("/login");
		  }, [id]);
  
	const handleLogin =()=> {
		axios.post('http://localhost:8004/login', {
			email:email,
			password:password,
		}).then(response=> {
			props.updateLogMsg(response.data.status);
			if(response.data.flag){
				setId(response.data.id[0].ID);
			
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
            state: {id: id}
        }}/>}
</div>

)}
export default Login;
