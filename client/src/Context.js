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
      currentPassword: '',
      currentCourseInfo: [],
      currentCourseOwner: []
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
                currentCourse: this.currentCourse,
                updateCourse: this.updateCourse,
                deleteCourse: this.deleteCourse
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

    currentCourse = async (courseId) => {
      const currentCourseInfo = await this.data.courseInfo(courseId)
      if(currentCourseInfo === 400){
        console.log('Course not found')
      } else {
        this.setState(()=>{
          return{
            currentCourseInfo: currentCourseInfo,
            currentCourseOwner: currentCourseInfo.User
          }
        })
      }
      return currentCourseInfo
    }

    updateCourse = async (courseData) => {
      const newData = courseData
      const authUser = this.state.authenticatedUser

      if(authUser != null){

        if(typeof authUser === 'string' || authUser instanceof String){
          //authUser was passed down as a string
          const objAuthUser = JSON.parse(authUser)

          if(objAuthUser.emailAddress === this.state.currentCourseOwner.emailAddress){
            //make "body" obj to send to update
            const updatedData = {
              id: this.state.currentCourseInfo.id,
              title: newData[0],
              description: newData[1],
              estimatedTime: newData[2],
              materialsNeeded: newData[3]
            }
            const response = await this.data.updateCourse(this.state.currentCourseInfo.id, updatedData, objAuthUser)
            return response
          } else {
            console.log('must be owner of the course')
          }

        } else {//authUser was already passed as a obj

          if(authUser.emailAddress === this.state.currentCourseOwner.emailAddress){
            //make "body" obj to send to update
            const updatedData = {
              id: this.state.currentCourseInfo.id,
              title: newData[0],
              description: newData[1],
              estimatedTime: newData[2],
              materialsNeeded: newData[3]
            } 
            this.data.updateCourse(this.state.currentCourseInfo.id, updatedData, authUser)
          } else {
            console.log('must be owner of the course')
          }
        }

      }else{
        console.log('must login to update Course')
      }
    }
    deleteCourse = async (courseId) => {
      console.log(courseId)
      const authUser = this.state.authenticatedUser
      if(typeof authUser === 'string' || authUser instanceof String){
        const parsedAuth = JSON.parse(authUser)
        return this.data.removeCourse(courseId, parsedAuth) //return this call to work with the .then() promise in the component 
      }
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