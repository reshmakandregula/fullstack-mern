import React, { Component } from "react";
import axios from "axios";
import UsersForm from "./UsersForm";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
//import {Link} from "react-router-dom"

class FrontPage extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    visible: false,
    modalVisibility: false,
    search: "",
    users: [],
    currentId: "",
    errors: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    direction: {
      firstName: "asc",
      lastName: "asc",
      age: "asc",
      gender: "asc",
    },
  };

  getUsers = () => {
    axios
      .get("/api/users")
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  onChange = (e) => {
    const { name, value } = e.target;

    if ([name] == "firstName") {
      this.setState({
        data: { ...this.state.data, firstName: value },
        errors: {
          ...this.state.errors,
          firstName: this.state.firstName === "" || null ? true : false,
        },
      });
    }
    if ([name] == "lastName") {
      this.setState({
        data: { ...this.state.data, lastName: value },
        errors: {
          ...this.state.errors,
          lastName: this.state.lastName === "" || null ? true : false,
        },
      });
    }
    if ([name] == "age") {
      this.setState({
        data: { ...this.state.data, age: value },
        errors: {
          ...this.state.errors,
          age: this.state.age === "" || null ? true : false,
        },
      });
    }
    if ([name] == "gender") {
      this.setState({
        data: { ...this.state.data, gender: value },
        errors: {
          ...this.state.errors,
          gender: this.state.gender === "" || null ? true : false,
        },
      });
    }
  };

  validate = () => {
    this.setState({
      errors: {
        firstName: this.state.data.firstName === "",
        lastName: this.state.data.lastName === "",
        age: this.state.data.age === "",
        gender: this.state.data.gender === "",
      },
    });
    return (
      this.state.data.firstName == "" &&
      this.state.data.lastName == "" &&
      this.state.data.age == "" &&
      this.state.data.gender == ""
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName: this.state.data.firstName,
      lastName: this.state.data.lastName,
      age: this.state.data.age,
      gender: this.state.data.gender,
    };

    if (this.validate()) return;
    if (this.state.currentId === "") {
      console.log("addnew");
      axios.post("/api/users", userData).then((res) => console.log(res.data));
      this.getUsers();

      this.setState({
        data: { firstName: "", lastName: "", age: "", gender: "" },
        visible: false,
      });
    } else if (this.state.currentId !== "") {
      console.log("update");
      axios.put("/api/users/" + this.state.currentId, userData);
      this.getUsers();
      console.log(this.state);
      this.setState({
        data: { firstName: "", lastName: "", age: "", gender: "" },
        visible: false,
        currentId: "",
      });
      window.location = "/";
    }
  };

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  deleteUser = (id) => {
    axios.delete("/api/users/" + id).then((res) => console.log(res.data));

    this.setState({
      users: this.state.users.filter((el) => el._id !== id),
    });
  };

  editUser = (id) => {
    this.setState({
      currentId: id,
      modalVisibility: true,
    });
    axios
      .get("/api/users/" + id)
      .then((res) => {
        this.setState({
          modalVisiblitiy: true,
          data: {
            ...this.state.data,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: res.data.age,
            gender: res.data.gender,
          },
        });
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  sortUser = (name) => {
    const users = this.state.users;
    this.setState({
      users: users.sort((a, b) =>
        this.state.direction[name] === "asc"
          ? a[name] < b[name] && -1
          : a[name] > b[name] && -1
      ),
      direction: {
        [name]: this.state.direction[name] === "asc" ? "desc" : "asc",
      },
    });
    console.log(users);
  };

  closeModal = () => {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  render() {
    return (
      <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>User Entry Details</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.setState({
                visible: !this.state.visible,
              });
            }}
          >
            Add Details
          </button>
        </div>

        <br />
        <br />
        <div>
          {this.state.visible && (
            <UsersForm
              handleSubmit={this.handleSubmit}
              data={this.state.data}
              errors={this.state.errors}
              onChange={this.onChange}
            />
          )}

          {this.state.modalVisibility && (
            <UserModal
              closeModal={this.closeModal}
              onChange={this.onChange}
              handleSubmit={this.handleSubmit}
              data={this.state.data}
              errors={this.state.errors}
            />
          )}

          <UsersTable
            users={this.state.users}
            search={this.state.search}
            deleteUser={this.deleteUser}
            editUser={this.editUser}
            sortUser={this.sortUser}
            filteredUsers={this.filteredUsers}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default FrontPage;
