import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/General.css'

class SignUp extends Component{

constructor(props){
  super(props)
  this.state={
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  } 
}

  handleSubmit = e => {
    e.preventDefault()
    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
  }
  let self = this

        fetch("/add_user", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data.success){
               alert('Thanks for signing up. You can now log in.') 
               self.props.history.push('/login')
            }
        }).catch(function(err) {
            console.log(err)
        });
  }

  render(){
    return(
      <div>
        <label>Just Lend</label>
        <br/>
        <br/>
        <form onSubmit = {this.handleSubmit}>
          <label >First Name</label><br/>
          <input id="first_name"
           value={this.state.first_name}
           onChange={e => this.setState({ first_name: e.target.value })}
           /><br/>
          <label >Last Name</label><br/>
          <input id="last_name"
          value={this.state.last_name}
          onChange={e => this.setState({last_name: e.target.value })}/><br/>

          <label >Email</label><br/>
          <input type="email" id="email"
           value={this.state.email}
           onChange={e => this.setState({email: e.target.value })}/><br/>
          <label >Password</label><br/>
          <input type="password" id="password"
           value={this.state.password}
           onChange={e => this.setState({password: e.target.value })}/><br/>

          <button type="submit">Sign Up</button><br/>
          <br/>
          <a href="/Login">Already have an account? Login</a>
        </form>
      </div>
    )
  }
}

export default withRouter(SignUp);