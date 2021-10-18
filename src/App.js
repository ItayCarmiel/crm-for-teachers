import './App.css';
import Controller from './components/controller';
import React, { useState,useEffect } from 'react';
import Home from './components/home';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [isConnect, setIsConnect] = useState()
  const [id, setId] = useState("")
	const [title, setTitle] = useState("")

    useEffect(() => {
    var token = localStorage.getItem("token");
    if(token){
    axios.post('http://localhost:8004/jwtVerify', {
    token
    }).then(response=> {
      if(response.data.flag){
        setId(response.data.details.user_id);
        setTitle(response.data.details.title);
        setIsConnect(true);
        }
        else setIsConnect(false);
      })
    } else setIsConnect(false);
  },[]);

  return (
<div>
    {/* <Controller /> */}
    <Router>
    <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  if(!isConnect){
                    return(<p>Click <a href="/login">here</a> to Login</p>);
                  }
                  if(isConnect){
                    setIsConnect(false);
                    return( <Redirect to={{
                      pathname: '/home',
                      state: {id: id, title: title}
                    }}/> )
                  }
                  return (<Redirect to="/login"/>)            
                 }}  
              />
               <Route path="/login" component={Controller} />
               <Route path="/home"  component={Home} />
            </Switch>
     </Router>
  </div>
  
  );
}
export default App;
