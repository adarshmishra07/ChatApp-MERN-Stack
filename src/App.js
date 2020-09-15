import React from "react";
import "./App.css";
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Home from "./components/home/Home";import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'
import {clearProfile} from './actions/profileAction'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddUser from "./components/AddUser";
import Chat from './components/Chat/Chat'
import PrivateRoute from './components/common/PrivateRoute'
import { Provider } from "react-redux";
import store from './store'


//Check if token exist 
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now()/1000
  if(decoded.exp<currentTime){
    store.dispatch(logoutUser())
    store.dispatch(clearProfile())
    window.location.href = "/login"
  }
}

function App() {
  return (
    <div className="app">
    <Provider store={store}> 
      <Router>
        <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/adduser" component={AddUser}/>
        <PrivateRoute exact path="/chat/:chatName" component={Chat}/>
        </Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        
      </Router>
      </Provider>
    </div>
  );
}

export default App;
