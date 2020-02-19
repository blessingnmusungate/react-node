import React, {Component} from 'react'
import '../styles/General.css'
import { withRouter } from 'react-router-dom'

class Login extends Component{
constructor(props){
  super(props)
  this.state={
    email: '',
    password: ''
 }
}


  handleSubmit = e => {
    e.preventDefault()
    let self = this
    fetch(`/fetch_user?email=${this.state.email}&password=${this.state.password}`, {
      method: 'GET'
  }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  }).then(function(data) {
      self.props.updateUser(data.user)
      if(data.user)
        self.props.history.push('/details')
      else alert('Username or password is incorrect')
  }).catch(err => {
    console.log('caught it!',err);
  })
  }

  

  render(){
    return(
      <div>
        <label>Just Lend</label>
        <form onSubmit = {this.handleSubmit}>

          <label >Email</label><br/>
          <input type="email" id="email"
           value={this.state.email}
           onChange={e => this.setState({email: e.target.value })}/><br/>
          <label >Password</label><br/>
          <input type="password" id="password"
           value={this.state.password}
           onChange={e => this.setState({password: e.target.value })}/><br/>

          <button type="submit">Login</button><br/>
          <a href="/SignUp">Don't have an account? SignUp</a>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);