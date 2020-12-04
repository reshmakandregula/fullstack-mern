import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

class UsersTable extends Component {
  render() {
    const {
      users,
      deleteUser,
      editUser,
      sortUser,
      search,
      handleChange,
    } = this.props;
    const filteredUsers = users.filter((user) => {
      return user.firstName.toLowerCase().includes(search.toLowerCase());
    });
    return (
      <div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                UsersList
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search Users...."
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
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
            {filteredUsers.map((currentUser) => {
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
}

export default UsersTable;
