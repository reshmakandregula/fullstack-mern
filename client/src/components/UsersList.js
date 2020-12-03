import React from "react";

export default function UsersList({ users, deleteUser, editUser, sortUser }) {
  return (
    <div>
      <table className="table table-striped container">
        <thead className="tableHover">
          <tr>
            <th onClick={() => sortUser("firstName")}>Firstname</th>
            <th onClick={() => sortUser("lastName")}>lastname</th>
            <th onClick={() => sortUser("age")}>Age</th>
            <th onClick={() => sortUser("gender")}>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((currentUser) => {
            return (
              <tr key={currentUser._id}>
                <td>{currentUser.firstName}</td>
                <td>{currentUser.lastName}</td>
                <td>{currentUser.age}</td>
                <td>{currentUser.gender}</td>
                <td>
                  <button
                    onClick={() => editUser(currentUser._id)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </td>
                {/* <td><Link to={"/edit/"+currentUser._id}  className="btn btn-info">Edit</Link></td> */}
                <td>
                  <button
                    onClick={() => deleteUser(currentUser._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
