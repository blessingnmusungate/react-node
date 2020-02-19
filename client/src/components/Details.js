import React, {Component} from 'react'
import '../styles/General.css'
import '../styles/Details.css'

class Details extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: '',
            allUsers: []
        }
    }
    
    componentDidMount(){
        let self = this
        this.setState({user: this.props.user})
        
        fetch('fetch_all_users', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({allUsers: data});
        }).catch(err => {
        console.log('caught it!',err);
        })

       
    }
    logout = () => this.props.updateUser(null)

    renderUserTable(){
        return this.state.allUsers.map((data, index) =>{
            return(
                <tr key={index}>
                <td>{data.id}</td>
                <td>{data.FirstName}</td>
                <td>{data.LastName}</td>
                <td>{data.Email}</td>
            </tr>
            )
        })
    }
    render(){
        var user = JSON.parse(this.props.user)
        if(!user){
            return(
                <div>
                    Page loading
                </div>
            )
        }
        
        return(
            
            <div>
                <div id="top-panel">
                    <label> Welcome to JustLend </label>
                    <a href="/Login" className="logout" onClick= {this.logout}>Logout</a>
                </div>
                
                <div id="details-container">
                 
                    <div id="details-panel">
                    <hr/>
                        <div id="user-home">
                            <h1>Hi, {user.FirstName}</h1>
                            <p>Here are your details:</p>
                            
                            <label>ID: {user.id}</label><br/>
                            <label>First Name: {user.FirstName}</label><br/>
                            <label>Last Name: {user.LastName}</label><br/>
                            <label>Email: {user.Email}</label>
                        </div>
                        <hr/>
                    <div id="user-list">
                        <h1>User List</h1>
                        <p>Here is a full list of all system users</p>
                        <table>
                         <thead>
                             <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            </tr>
                       </thead>
                        <tbody>
                        {this.renderUserTable()}
                        </tbody>
                        </table>
          
                        </div>
                        <hr/>
                        <div id="contact">
                            <h1>Let's stay in touch</h1>
                            <p>For enquires please contact us using any of the options listed below</p>
                            <p>Email: info@justlend.com</p>
                            <p>Telephone: +44 000000000</p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Details