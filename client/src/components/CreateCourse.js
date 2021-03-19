import React ,{ Component } from "react";

export default class CreateCourse extends Component{
  state ={
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []
  }
    render(){

      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors
      } = this.state
      const { context } = this.props

      const errorDisplay = this.state.errors.map((error) => 
        <React.Fragment>
          <li>{error}</li>
        </React.Fragment>
      )

      console.log(context.authenticatedUser)
        return(
            <div id="root">
              <div>
                <hr />
                <div className="bounds course--detail">
                  <h1>Create Course</h1>
                  <div>
                  {
                      errors.length
                      ? <div>
                          <h2 class="validation--errors--label">Validation errors</h2>
                          <div class="validation-errors">
                            <ul>
                             {errorDisplay}
                            </ul>
                          </div>
                        </div>
                      :<div></div>
                    }
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
      //get the authenticated user
      const authUser = this.props.context.authenticatedUser
      const { context } = this.props
      const formattedAuth = context.actions.formatting(authUser)
      const newCourseData = {
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded,
        userId: formattedAuth.id
      }
      this.props.context.data.createCourse(formattedAuth, newCourseData).then(course => {
        if(course.status == 500){
          this.props.history.push('/errors')
        }else if(course.status == 400){
          course.json().then(error =>{
            this.setState(() => {
              return{
                errors: error.errors
              }
            })
          } )
        }else{
          this.props.history.push('/courses')
        }
        
      })
    }
}