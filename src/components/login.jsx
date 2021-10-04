import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";	

import axios from 'axios'
import { colors } from '@material-ui/core';

const Login=(props)=>
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
	const [title, setTitle] = useState("")
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
		if (title.length < 1){
			document.getElementsByClassName("select")[0].style.borderColor="red";
			document.getElementsByClassName("select")[0].style.borderStyle="dotted";
		  }
		else{
			document.getElementsByClassName("select")[0].style.borderColor="#eee";
			document.getElementsByClassName("select")[0].style.borderStyle="solid";
		axios.post('http://localhost:8004/login', {
			email:email,
			password:password,
			title:title
		}).then(response=> {
			props.updateLogMsg(response.data.status);
			if(response.data.flag){
				setId(response.data.id[0].ID);
			
			}
		})
	}}
	
    return(
<div className="logform">
		<inForm action="#">
			<input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
			<select  className="select" onChange= {e=>setTitle(e.target.value)}>
        	<option selected disabled>I'm a:</option>
        	<option value="teachers">Teacher</option>
        	<option value="students">Student</option>
        </select> 
			<button onClick={handleLogin}>
			Login
			</button>
		</inForm>
		{openHome && <Redirect to={{
            pathname: '/home',
            state: {id: id}
        }}/>}
</div>

)}
export default Login;
