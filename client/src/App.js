import React from 'react';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUser from "./components/EditUser";
import UsersList from "./components/UsersList";


function App() {
  return (
    <Router>
    <Route path="/" exact component={UsersList}/>
    <Route path="/edit" component={EditUser}/>
    </Router>
  )
}

export default App;
