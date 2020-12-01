import axios from 'axios';
import React, { Component } from 'react';
import UserForm from "./UserForm";
import UsersTable from './UsersTable';
import "../App.css";

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
                <UsersTable deleteUser={this.deleteUser} users={this.state.users}/>
        </div>
    )
    }
}

export default UsersList;