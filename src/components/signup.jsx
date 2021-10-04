import React, { useState } from 'react';

import axios from 'axios'

const SignUp = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullname] = useState("")
  const [phone, setPhone] = useState("")
  const [title, setTitle] = useState("")
  const [signMsg, setSignMsg] = useState("")

  const handleSubmit =()=> {
    if (title.length < 1){
      document.getElementsByClassName("select")[0].style.borderColor="red";
			document.getElementsByClassName("select")[0].style.borderStyle="dotted";
    }
    else{
      document.getElementsByClassName("select")[0].style.borderColor="#eee";
			document.getElementsByClassName("select")[0].style.borderStyle="solid";
    axios.post('http://localhost:8004/signUp', {
        fullName:fullName,
        password:password,
        email:email,
        phone:phone,
        title:title
    }).then(response=> {
        props.updateSignMsg(response.data.status);
        if(response.data.flag){
          props.handleClose();
        }
    })
  }}


  return (
    
			<div className="signform">
        <div>
        <input type="fullname" placeholder="FullName" onChange= {e=>{setFullname(e.target.value)}} />
        <input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
        <input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
        <input type="phone" placeholder="Phone" onChange= {e=>setPhone(e.target.value)} />
        </div>
        <select className="select" onChange= {e=>setTitle(e.target.value)}>
        <option selected disabled>I'm a:</option>
        <option value="teachers">Teacher</option>
        <option value="students">Student</option>
        </select>
        <div >
    
    <button  onClick={handleSubmit}>
				Submit
				</button>
    </div>
			</div>
	
  );
};

export default SignUp;