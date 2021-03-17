import { Component } from "react";
import React from 'react';
import { Link } from "react-router-dom";

export default class CourseDetails extends Component{
    //componentDidMount to load the current course 
    state = {
        errors : [],
        course: [],
        author : []
    }
    componentDidMount(){
        fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(course => this.setState({
            course,
            author: course.User
        }))
        document.title = 'Courses'
    }
    render(){
        const courseData = this.state.course
        const courseOwner = this.state.author
        const errors =this.state.errors
        console.log(this.state.errors)
        return(
            <div id="root">
              <div>
                <div class="actions--bar">
                  <div class="bounds">
                    <div class="grid-100"><span><Link className="button" to={{pathname: `${courseData.id}/update`}}>Update Course</Link><button class="button" onClick={this.delete}>Delete Course</button></span><Link
                        class="button button-secondary" to="/courses">Return to List</Link>
                    </div>
                  </div>
                  {
                    errors.err
                    ?<h1>{errors.err}</h1>
                    :<div></div>
                  }
                </div>
                <div class="bounds course--detail">
                  <div class="grid-66">
                    <div class="course--header">
                      <h4 class="course--label">Course</h4>
                      <h3 class="course--title">{courseData.title}</h3>
                      <p>{courseOwner.firstName} {courseOwner.lastName}</p>
                    </div>
                    <div class="course--description">
                        {courseData.description}
                    </div>
                  </div>
                  <div class="grid-25 grid-right">
                    <div class="course--stats">
                      <ul class="course--stats--list">
                        <li class="course--stats--list--item">
                          <h4>Estimated Time</h4>
                          {
                              courseData.estimatedTime
                              ? <h3>{courseData.estimatedTime}</h3> 
                              : <h3>Null</h3>
                          }
                        </li>
                        <li class="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <ul>{
                            courseData.materialsNeeded
                            ?courseData.materialsNeeded.split('*').slice(1).map((mat, key) => <li key={key}>*{mat}</li>)
                            :<li>null</li>
                            
                          }
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
        )
    }
    delete = (event) => {
      const { context } = this.props
      event.preventDefault()
      const courseId = this.state.course.id
      console.log(courseId)
      context.actions.deleteCourse(courseId).then(res => {
        console.log(res)
        if(res.err){
          console.log(res.err)
          this.setState({
            errors: res
          })
        }else{
          this.props.history.push('/courses')
        }
        //take response if 200 redirect to /courses
        //else display error on page message from API => ("Must be the owner of this course to delete.")
      })
    }

}