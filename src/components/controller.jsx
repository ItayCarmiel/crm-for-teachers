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
        {open && <Login updateLogMsg = {(e)=> setLogMsg(e)} handleClose={handleOpen}/>}
        {logMsg}
        {!open && <button onClick={handleOpen}>
            LogIn
        </button>}
        {!open && <SignUp updateSignMsg = {(e)=> setSignMsg(e)} handleClose={handleOpen} />}
        {signMsg}
        {open && <button onClick={handleOpen}>
            SignUp
        </button>}
        <Footer mail = "itaycar875@gmail.com"/>
    </div>

)}
export default Controller;
