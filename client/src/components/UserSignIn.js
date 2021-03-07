import { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignIn extends Component{
    render(){
        return(
            <div className="root">
                <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                      <form onSubmit={this.submit}>
                        <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" /></div>
                        <div><input id="password" name="password" type="password" className placeholder="Password" /></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
                      </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                  </div>
                </div>
            </div> 
        )
      }
    submit = (event) => {
      event.preventDefault();
      console.log('click')
      const { context } = this.props;
      console.log(this.props)
      console.log(context)
    }
}