import axios from 'axios';
import React, { Component } from 'react';
import UserForm from "./UserForm";
import EditUser from "./EditUser";

class UsersList extends Component {

    state={
        users:[]
    };

    


getUsers(){
    axios.get('/api/users')
    .then(res => {
        this.setState({users: res.data})
    })
    .catch((error) => {
        console.log(error);
    })
}


componentDidMount() {
        this.getUsers();
}
    deleteUser = (id) => {
        
        axios.delete('/api/users/'+id)
        .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    

     
    render(){
    return (
        <div> 
            <UserForm />
            <h2>Logged Users</h2>
                <table className="table">
                  <thead className="thead-light">
                      <tr>
                          <th>Firstname</th>
                          <th>Lastname</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Edit</th>
                          <th>Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                      { this.state.users.map(currentUser => {
            
              return(  <tr key={currentUser._id}>
                    <td>{currentUser.firstName}</td>
                    <td>{currentUser.lastName}</td>
                    <td>{currentUser.age}</td>
                    <td>{currentUser.gender}</td>
                    <td>
                        <button onClick={() => <EditUser key={currentUser._id}/>} className="btn btn-info">Edit</button>
                    </td>
                    <td>
                        <button onClick={() => this.deleteUser(currentUser._id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>)
            
        }) }
                  </tbody>
                </table>
        </div>
    )
    }
}

export default UsersList;