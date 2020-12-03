import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";

 class EditUser extends Component {
    state = {
        firstName:'',
        lastName:'',
        age:0,
        gender:'',
        fError:'',
        lError:'',
        aError: '',
        gError:'',    
        users:[]
    }
 
   
    validate = () => {
        let fName = "";
        let lName = "";
        let aError = "";
        let gError = "";
    
        if (!this.state.firstName) {
          fName = "can't be blank";
        }
        if (!this.state.lastName) {
          lName = "can't be blank";
        }
        if (!this.state.age) {
          aError = "can't be blank";
        }
        if (!this.state.gender) {
          gError = "can't be blank";
        }
        if (fName || lName || aError || gError) {
          this.setState({ fName, lName, aError, gError });
          return false;
        }
        return true;
      };
      componentDidMount() {
        axios
          .get("/api/users")
          .then((res) => {
            this.setState({ persons: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get("/api/users/edit/" + this.props.match.params.id)
          .then((res) => {
            this.setState({
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              age: res.data.age,
              gender: res.data.gender,
            });
          })
          .catch(function (err) {
            console.log(err);
          });
        axios.get("/api/users").then((response) => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map((user) => user.firstName),
            });
          }
        });
      
    }
        onChange = (e) =>{
          // let fError = this.state.errors.fError;
           const {name, value} = e.target;
           if(name === "firstName"){
          if(this.state.firstName.length < 1){
           this.setState({fError:""});
          }
           }
        if(name === "lastName"){
        if(this.state.lastName.length < 1){
            this.setState({lError:""});
        }
            }
        if(name === "age"){
        if(this.state.age.length < 1){
            this.setState({aError:""});
        }
            }
        if(name === "gender"){
        if(this.state.gender.length < 1){
            this.setState({gError:""});
        }
            }
          
            this.setState({
                [name]: value
            })
        }

    handleSubmit = (e) =>{
        e.preventDefault();
        
        const config ={
            headers: {
                'Content-Type': 'application/json'
            }
           
        };

        const userData = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            age:this.state.age,
            gender:this.state.gender
        };
    
        const isValid = this.validate();
          if(isValid){axios.put('/api/users/edit/'+this.props.match.params.id, userData, config)
            .then(res => console.log(res.data));
window.location="/";
    console.log(this.state);
        this.setState({
            firstName:'',
            lastName:'',
            age:0,
            gender:''
        })
    }
};
    


    render() {
        return (
            
            <div className="container">
                <br/>
                    <br/>
                <form onSubmit={this.handleSubmit} className="contain">
                    
                    <div className="form-group">
                    
                        <label>Firstname: </label>
                        <br/>
                        <input type="text"
                        placeholder="Enter firstname"
                        name="firstName"
                        className="form-group"
                        value={this.state.firstName}
                        onChange={this.onChange}/>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.fError}</div>
                    </div>
                    
                    <div className="form-group">
                        <label>Lastname: </label>
                        <br/>
                        <input type="text"
                        placeholder="Enter lastname"
                        name="lastName"
                        className="form-group"
                        value={this.state.lastName}
                        onChange={this.onChange}/>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.lError}</div>
                    </div>
                    
                    <div className="form-group">
                        <label>Age: </label>
                        <br/>
                        <input type="number"
                        name="age"
                        className="form-group"
                        value={this.state.age}
                        onChange={this.onChange}/>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.aError}</div>
                    </div>
                    
                    <div className="form-group">
                        <label>Gender:
                            <br/>
                        <input type="radio" value="male" name="gender" checked={this.state.gender ==="male"} onChange={this.onChange}/>Male 
                        <br/>
                        
                        <input type="radio" value="female" name="gender" checked={this.state.gender ==="female"} onChange={this.onChange}/>Female
                        </label>
                        <div style={{ fontSize: 12, color: "red"}}>{this.state.gError}</div>   
                         </div>

                         <div className="form-group">
                            <input type="submit" value="EditUser" className="btn btn-primary" />
                         </div>
                </form>
            </div>
        )
    }
}


export default EditUser