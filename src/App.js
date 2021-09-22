import './App.css';
import Controller from './components/controller';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
<div>
    {/* <Controller /> */}
    <Router>
    <Switch>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      //this.state.isUserAuthenticated ?
                      <Redirect to="/login" /> 
                      //<Redirect to="/test1" /> 
                    )
                }}
              />
               <Route exact path="/login" component={Controller} />
               <Route exact path="/home" component={Home} />
            </Switch>
     </Router>
  </div>
  
  );
}
export default App;
