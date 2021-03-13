import { Component } from "react";

export default class CreateCourse extends Component{
  state ={
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  }
    render(){

      const {
        title,
        description,
        estimatedTime,
        materialsNeeded
      } = this.state

        return(
            <div id="root">
              <div>
                <hr />
                <div className="bounds course--detail">
                  <h1>Create Course</h1>
                  <div>
                    <div>
                      <h2 className="validation--errors--label">Validation errors</h2>
                      <div className="validation-errors">
                        <ul>
                          <li>Please provide a value for "Title"</li>
                          <li>Please provide a value for "Description"</li>
                        </ul>
                      </div>
                    </div>
                    <form onSubmit={this.submit}>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} value={title}/></div>
                          <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                          <div><textarea id="description" name="description" className placeholder="Course description..." onChange={this.change} value={description}/></div>
                        </div>
                      </div>
                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.change} value={estimatedTime}/></div>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." onChange={this.change} value={materialsNeeded}/></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
                    </form>
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

     submit = (event) =>{
      event.preventDefault()
      console.log(this.state.title)
      //get the authenticated user
      const authUser = this.props.context.authenticatedUser
      console.log('authUser', authUser)
      if (typeof authUser === 'string' || authUser instanceof String){ // check to see if authUser is a string if string convert to json ****this happens after reload****
        // it's a string
        const objAuthUser = JSON.parse(authUser)
        console.log(objAuthUser)
        const newCourseData = {
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialsNeeded: this.state.materialsNeeded,
          userId: objAuthUser.id
        }
        //send course data  <------ via props also send the auth user
        console.log(newCourseData)
        this.props.context.data.createCourse(objAuthUser, newCourseData).then(course => {
          this.props.history.push('/courses')
        })
      }else{
        // it's something else
        const newCourseData = {
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialsNeeded: this.state.materialsNeeded,
          userId: authUser.id
        }
        console.log('no Json',newCourseData)
      }
      //send course data <------ via props also send the auth user
      
      
     }
}