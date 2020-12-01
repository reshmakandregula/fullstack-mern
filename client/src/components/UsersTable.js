import React from 'react';
import {Link} from "react-router-dom";

export default function UsersTable ({users,deleteUser}) {
    return (
        <table className="table table-striped container">
                  <thead className="tableHover">
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
                      {users.map(currentUser => {
            
              return(  <tr key={currentUser._id}>
                    <td>{currentUser.firstName}</td>
                    <td>{currentUser.lastName}</td>
                    <td>{currentUser.age}</td>
                    <td>{currentUser.gender}</td>
                    <td>
                        <Link to={"/edit/"+currentUser._id}  className="btn btn-info">Edit</Link>
                    </td>
                    <td>
                        <button onClick={() => deleteUser(currentUser._id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>)
            
        }) }
                  </tbody>
                </table>
    )
}



