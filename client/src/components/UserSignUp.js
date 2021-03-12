import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserSignUp extends Component{
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  }
    render(){

      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      } = this.state

        return(
            <div id="root">
              <div>
                <hr />
                <div className="bounds">
                  <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                      <form onSubmit={this.submit}>
                        <div><input id="firstName" name="firstName" type="text" className placeholder="First Name"  value={firstName} onChange={this.change}/></div>
                        <div><input id="lastName" name="lastName" type="text" className placeholder="Last Name" value={lastName} onChange={this.change} /></div>
                        <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" value={emailAddress} onChange={this.change}  /></div>
                        <div><input id="password" name="password" type="password" className placeholder="Password"  value={password} onChange={this.change}/></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password" className placeholder="Confirm Password"  /></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
                      </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="signin">Click here</Link> to sign in!</p>
                  </div>
                </div>
              </div>
            </div>
        )
    }

    change = (event) =>{
      const name = event.target.name
      const value = event.target.value
      this.setState(() =>{
        return{
          [name]: value
        }
      })
    }

    submit = (event) => {
      event.preventDefault()
      const { firstName, lastName, emailAddress, password, confirmPassword} = this.state
      console.log(firstName, password)
      const user = {
        firstName,
        lastName,
        emailAddress,
        password
      }
      this.props.context.actions.signUp(user)
    }
}