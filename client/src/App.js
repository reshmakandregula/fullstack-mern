import React from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditUser from "./components/EditUser";
import FrontPage from "./components/FrontPage";


function App() {
  return (
    <Router>
    <Route path="/" exact component={FrontPage}/>
    <Route path="/edit/:id" component={EditUser}/>
    </Router>
  )
}

export default App;
