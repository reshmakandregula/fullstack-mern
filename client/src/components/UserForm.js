import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";

export default class CreateUser extends Component {
    state = {
        firstName:'',
        lastName:'',
        age:'',
        gender:'',
        fError:'',
            lError:'',
            aError: '',
            gError:'',
        visible: true,
        users:[],
        currentId:''
    }
 

componentDidMount() {
    axios.get('/api/users')
    .then(response => {
        if(response.data.length > 0) {
            this.setState({
                users: response.data.map(user => user.firstName),
                
            })
        }
    })
}

validate= () => {
    
    let fError='';
    let lError='';
    let aError='';
    let gError='';
    if(this.state.firstName ===''){
        fError="cant be blank";
    }
    if(this.state.lastName ===''){
        lError="cant be blank";
    }
    if(this.state.age ===''){
        aError="cant be blank";
    }
    if(this.state.gender ===''){
        gError="cant be blank";
    }

     if(fError || lError || aError || gError){
         this.setState({fError,lError,aError,gError});
         return false;
     }

return true;

}
    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
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
        if(isValid){
            axios.post('/api/users', userData, config)
            .then(res => console.log(res.data));
           window.location="/";
    
        this.setState({
            firstName:'',
            lastName:'',
            age:0,
            gender:'',
            fError:'',
            lError:'',
            aError: '',
            gError:''
        })
    }
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
        {this.state.visible ? null : (
          <form onSubmit={this.handleSubmit} className="contain">
            <div className="form-group">
              <label>Firstname: </label>
              <br />
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
                            <input type="submit" value="CreateUser" className="btn btn-primary" />
                         </div>
                </form>
        )};
            </div>
        )
    }
};


