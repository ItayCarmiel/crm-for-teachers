import React, { useState } from 'react';
const Login=()=>
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return(
<div className="container">
    <div className="head">
      <header>Peacher</header>
     <second>You're personal teacher for private lessons</second>
      </div>
	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<input type="email" placeholder="Email" onChange= {e=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange= {e=>setPassword(e.target.value)} />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>First time?</h1>
				<p>Enter your personal details and start journey with us for free</p>
				<button className="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>

)}
export default Login;
