import React, {Component} from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../styles/App.css'
import Login from './Login'
import SignUp from './SignUp'
import Details from './Details'

class App extends Component{
  constructor(props){
    super(props)

    this.state = {
      user: null
    }
  }

  updateUser = (newUserVal) => {
      this.setState({user: newUserVal})
  }
  render(){
      return(
        <div>
        <Router>
        <div>
         
          <hr />
  
          <Switch>
            <Route path="/login">
              <Login user={this.state.user} updateUser={this.updateUser}/>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/details">
              <Details user={this.state.user} updateUser={this.updateUser}/>
            </Route>
            <Redirect exact from="/" to="login" />
          </Switch>
        </div>
      </Router>
      </div>
      )
  }
}

export default App

