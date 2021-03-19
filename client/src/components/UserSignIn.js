import { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignIn extends Component{ 

  state = {
        authenticated: '',
        emailAddress: '',
        password: '',
        errors: []
    }
    render(){

      const {
        emailAddress,
        password,
        errors
      } = this.state

        return(
            <div className="root">
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                      <form onSubmit={this.submit}>
                        <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" value={emailAddress} onChange={this.change}/></div>
                        <div><input id="password" name="password" type="password" className placeholder="Password" value={password} onChange={this.change}/></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link className="button" to="/courses">Cancel</Link></div>
                      </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                  </div>
                </div>
            </div> 
        )
      }
      
    change = (event) => {
      const name = event.target.name
      const value = event.target.value 
      this.setState(() => {
        return{[name]: value} 
      })
    }
    submit = (event) => {
      event.preventDefault();
      const { context } = this.props;
      const {emailAddress, password} = this.state
      const { from } = this.props.location.state || { from: {pathname: '/courses'}}
      context.actions.signIn(emailAddress, password).then( user => {
        if(user.err){
          this.setState({
            errors: user.err
          });
        }else{
          this.props.history.push(from)
        }
      })// if user is == to err => error message  else same user as authenticated and redirect to /courses
  }
}