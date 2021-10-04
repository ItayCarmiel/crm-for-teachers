import React, { useState } from 'react';
import SignUp from './signup';
import Login from './login';
import Footer from './footer';

//test
const Controller=()=>
{
 
	const [open, setOpen] = useState(true);
    const [logMsg, setLogMsg] = useState("");
    const [signMsg, setSignMsg] = useState("");
    
    const handleOpen = () => {
        setOpen(!open);
      };

  

    return(
    <div >
        <div className="head">
        <header>Peacher</header>
        <second>You're personal teacher for private lessons</second>
      </div>
      <div className="logPage">
          <div className="login">
          <logheader>login<br/></logheader>
        {open && <Login updateLogMsg = {(e)=> setLogMsg(e)} handleClose={handleOpen}/>}
        {!open && <button onClick={handleOpen}>
            Sign In
        </button>}
        <message><br/>{logMsg}</message>
        </div>
        <div className="signUp">
        <p><span>First time? </span><span>
        Enter your personal details </span><span> And start your journey with us!</span></p>
        <message>{signMsg}</message>
        {!open && <SignUp updateSignMsg = {(e)=> setSignMsg(e)} handleClose={handleOpen} />}
        {open && <button onClick={handleOpen}>
            Sign Up
        </button>}
        </div>
    </div>
        <Footer mail = "itaycar875@gmail.com"/>
    </div>

)}
export default Controller;
