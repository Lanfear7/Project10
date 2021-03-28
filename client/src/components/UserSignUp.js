import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserSignUp extends Component{
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []
  }
    render(){

      const {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
        errors
      } = this.state

      const errorDisplay = errors.map((error) => 
        <React.Fragment>
          <li>{error}</li>
        </React.Fragment>
      )

        return(
            <div id="root">
              <div>
                <hr />
                <div className="bounds">
                  <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    {
                      errors.length
                      ? <div>
                          <h2 className="validation--errors--label">Validation errors</h2>
                          <div className="validation-errors">
                            <ul>
                             {errorDisplay}
                            </ul>
                          </div>
                        </div>
                      :<div></div>
                    }
                    <div>
                      <form onSubmit={this.submit}>
                        <div><input id="firstName" name="firstName" type="text"  placeholder="First Name"  value={firstName} onChange={this.change}/></div>
                        <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name" value={lastName} onChange={this.change} /></div>
                        <div><input id="emailAddress" name="emailAddress" type="text"  placeholder="Email Address" value={emailAddress} onChange={this.change}  /></div>
                        <div><input id="password" name="password" type="password"  placeholder="Password"  value={password} onChange={this.change}/></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password"  value={confirmPassword} onChange={this.change} placeholder="Confirm Password"  /></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link className="button button-secondary" to="/courses">Cancel</Link></div>
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
      const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
      }
      if(user.password === user.confirmPassword){
        this.props.context.actions.signUp(user).then(user => {
        if(user.status === 201){
          this.props.history.push('/courses')
        } else {
          this.setState(()=>{
            return{
              errors: user.errors
            }
          })
        }
       })
      }else{
        this.setState(()=>{
          return{
            errors: ['Password did not match']
          }
        })
      }
      
    }
}