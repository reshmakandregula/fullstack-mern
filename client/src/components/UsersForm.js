import React, { Component } from "react";
import "../App.css";

class UsersForm extends Component {
  render() {
    const { data, errors, onChange, handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} className="contain">
          <div className="form-group">
            <label>Firstname: </label>
            <br />
            <input
              type="text"
              placeholder="Enter firstname"
              name="firstName"
              className="form-group"
              value={data.firstName}
              onChange={onChange}
            />
            <div style={{ fontSize: 14, color: "red" }}>
              {errors.firstName ? "can't be blank" : ""}
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
              value={data.lastName}
              onChange={onChange}
            />
            <div style={{ fontSize: 14, color: "red" }}>
              {errors.lastName ? "can't be blank" : ""}
            </div>
          </div>

          <div className="form-group">
            <label>Age: </label>
            <br />
            <input
              type="number"
              name="age"
              className="form-group"
              value={data.age}
              onChange={onChange}
            />
            <div style={{ fontSize: 14, color: "red" }}>
              {errors.age ? "can't be blank" : ""}
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
                checked={data.gender === "male"}
                onChange={onChange}
              />
              Male
              <br />
              <input
                type="radio"
                value="female"
                name="gender"
                checked={data.gender === "female"}
                onChange={onChange}
              />
              Female
            </label>
            <div style={{ fontSize: 14, color: "red" }}>
              {errors.gender ? "can't be blank" : ""}
            </div>
          </div>
          <div>
            <input type="submit" value="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default UsersForm;
