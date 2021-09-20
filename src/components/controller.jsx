import React, { useState } from 'react';
import SignUp from './signup'
import Login from './login';

import axios from 'axios'
//test
const Controller=()=>
{
 
	const [open, setOpen] = useState(true);
    const [msg, setMsg] = useState("");
    
    const handleOpen = () => {
        setOpen(!open);
      };

  

    return(
    <div >
        {open && <Login handleClose={handleOpen}/>}
        {!open && <button onClick={handleOpen}>
            LogIn
        </button>}
        {!open && <SignUp updateMsg = {(e)=> setMsg(e)} handleClose={handleOpen} />}
        {msg}
        {open && <button onClick={handleOpen}>
            SignUp
        </button>}
    </div>

)}
export default Controller;
