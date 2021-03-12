import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Header extends Component{
    render(){
      const isAuth = this.props.context.authenticatedUser
        return(
            <div className="header">
              <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                {isAuth 
                ? <React.Fragment><Link  className="signout"to='/signout'>Sign out</Link></React.Fragment>
                : <React.Fragment><Link className="signup" to="/signup">Sign Up</Link><Link className="signin"  to="/signin">Sign In</Link></React.Fragment>} 
                </nav>
              </div>
            </div>
        )
    }
}