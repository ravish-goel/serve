import React from "react";
import { url } from '../../../utils';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = null;
    this.passwordRef = null;
  }

  submit = (e) => {
    e.preventDefault();
    fetch(`${url}/authenticate`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: this.usernameRef.value, password: this.passwordRef.value}) // body data type must match "Content-Type" header
    }).then((response)=>{
          return response.json()
    }).then((data)=>{
        if(data.status === 'success'){
            window.location.href = data.redirect;
        }
    });
  }

  setUsernameRef = (element)=>{
    this.usernameRef = element;
  }

  setPasswordRef = (element)=>{
    this.passwordRef = element;
  }

  render() {    
    return (
      <div>
        <form onSubmit={this.submit}>
            <div>
                <label for="username"><b>Username</b></label>
                <input ref={this.setUsernameRef} type="text" placeholder="Enter Username" name="username" required></input>
                <label for="password"><b>Password</b></label>
                <input ref={this.setPasswordRef} type="password" placeholder="Enter Password" name="password" required></input>
                <button type="submit">Login</button>
            </div>
        </form>
      </div>
    );
  }
}
export default Login;