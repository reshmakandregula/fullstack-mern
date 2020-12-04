import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "../App.css";
import UsersList from "./UsersList";
import UserModal from "./UserModal";
//import {Link} from "react-router-dom"

class UserForm extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    visible: false,
    modalVisibility: false,
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
      this.state.data.firstName !== "" &&
      this.state.data.lastName !== "" &&
      this.state.data.age !== "" &&
      this.state.data.gender !== ""
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

    if (!this.validate()) return;
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
    console.log("edit clicked");
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
          {this.state.visible ? (
            <form onSubmit={this.handleSubmit} className="contain">
              <div className="form-group">
                <label>Firstname: </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter firstname"
                  name="firstName"
                  className="form-group"
                  value={this.state.data.firstName}
                  onChange={this.onChange}
                />

                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.errors.firstName ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <label>Lastname: </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter lastname"
                  name="lastName"
                  className="form-group"
                  value={this.state.data.lastName}
                  onChange={this.onChange}
                />
                {/* <div style={{ fontSize: 12, color: "red"}}>{this.state.lError}</div> */}

                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.errors.lastName ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <label>Age: </label>
                <br />
                <input
                  type="number"
                  name="age"
                  className="form-group"
                  value={this.state.data.age}
                  onChange={this.onChange}
                />
                {/* <div style={{ fontSize: 12, color: "red"}}>{this.state.aError}</div> */}

                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.errors.age ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Gender:
                  <br />
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    checked={this.state.data.gender === "male"}
                    onChange={this.onChange}
                  />
                  Male
                  <br />
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    checked={this.state.data.gender === "female"}
                    onChange={this.onChange}
                  />
                  Female
                </label>
                {/* <div style={{ fontSize: 12, color: "red"}}>{this.state.gError}</div> */}

                <div style={{ fontSize: 12, color: "red" }}>
                  {this.state.errors.gender ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </div>
            </form>
          ) : null}

          {this.state.modalVisibility ? (
            <UserModal
              closeModal={this.closeModal}
              onChange={this.onChange}
              handleSubmit={this.handleSubmit}
              data={this.state.data}
              errors={this.state.errors}
            />
          ) : null}

          <UsersList
            users={this.state.users}
            deleteUser={this.deleteUser}
            editUser={this.editUser}
            sortUser={this.sortUser}
          />
        </div>
      </div>
    );
  }
}

export default UserForm;
