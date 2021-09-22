import React, { useState } from 'react';

import axios from 'axios'
//test2

const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullname] = useState("")
  const [phone, setPhone] = useState("")
  const [signMsg, setSignMsg] = useState("")

  const handleSubmit =()=> {
    axios.post('http://localhost:8004/signUp', {
        fullName:fullName,
        password:password,
        email:email,
        phone:phone
    }).then(response=> {
        props.updateSignMsg(response.data.status);
        if(response.data.flag){
          props.handleClose();
        }
    })
  }


  return (
  
			<div >
				<h1>First time?</h1>
				<p>Enter your personal details and start your journey with us for free</p>
				{signMsg}
        <input type="fullname" placeholder="FullName" onChange= {e=>{setFullname(e.target.value)}} />
        <input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
        <input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
        <input type="phone" placeholder="Phone" onChange= {e=>setPhone(e.target.value)} />
        <div >
    
    <button  onClick={handleSubmit}>
				Submit
				</button>
    </div>
			</div>
	
  );
};

export default SignUp;