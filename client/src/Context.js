import React, { Component } from 'react'
import Data from './Data'
import Cookies from 'js-cookie'

const Context = React.createContext();

export class Provider extends Component {
    constructor() {
        super();
        this.data = new Data();
    }
    state ={
      authenticatedUser: Cookies.get('authenticatedUser')||null,
      currentPassword: ''
    }
    render() {
        const { authenticatedUser, currentPassword } = this.state
        const value = {
            authenticatedUser,
            currentPassword,
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
        console.log('user info',user)
        if(user.err){
          console.log(user.err)
        }else{
          console.log('signed in')
          this.setState(() => {
            return{
              authenticatedUser: user,
              currentPassword: password
            }
          })
          //add password (state)
          user.password = this.state.currentPassword
          console.log(user)
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
        }
        return user
    }

    signUp = async (user) => {
      const newUser = await this.data.createUser(user)
      if(newUser.status === 400){
        console.log(newUser.statusText)
      }else {
        this.setState(() =>{
          return{
            authenticatedUser: user
          }
        })
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
      }
      return newUser
    }

    signOut = () => {
      this.setState(()=>{
        return{
          authenticatedUser: null
        }
      })
      Cookies.remove('authenticatedUser')
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