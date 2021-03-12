import React, { Component } from 'react'
import Data from './Data'

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
    }
    state ={
      authenticatedUser: null
    }
    render() {
        const { authenticatedUser } = this.state
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signUp: this.signUp,
                signOut: this.signOut,
            }
        }
        return (
            <Context.Provider value={value}>
              {this.props.children}         
            </Context.Provider>
        )
    }

    signIn = async (emailAddress, password) => {
        console.log(emailAddress, password)
        const user = await this.data.userLogin(emailAddress, password)
        console.log(user)
        if(user.err){
          console.log(user.err)
        }else{
          console.log('signed in')
          this.setState(() => {
            return{authenticatedUser: user}
          })
        }
        return user
    }

    signUp = async (user) => {
      const newUser = await this.data.createUser(user)
      if(newUser.status === 400){
        console.log(newUser.statusText)
      }
    }

    signOut = () => {
      this.setState(()=>{
        return{
          authenticatedUser: null
        }
      })
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }