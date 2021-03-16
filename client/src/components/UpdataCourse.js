import { Component } from "react";

export default class UpdateCourse extends Component{
  componentDidMount(){
    const { context } = this.props
    const urlPath = this.props.location.pathname.split('/')
    const currentCourse = urlPath[2]
    context.actions.currentCourse(currentCourse).then(data =>{
      if(data === 400){
        this.props.history.push('/NotFound')
      } else{
        this.setState(()=>{
          return{
            course: data,
            author: data.User,
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded
          }
        })
      }
    })
  }

  state = {
    course: [],
    author: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  }
    render(){
      const courseData = this.state.course
      const courseAuthor = this.state.author
        return(
            <div id="root">
              <div>
                <hr />
                <div className="bounds course--detail">
                  <h1>Update Course</h1>
                  <div>
                    <form onSubmit={this.submit}>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={courseData.title} onChange={this.change}/></div>
                          <p>{courseAuthor.firstName} {courseAuthor.lastName}</p>
                        </div>
                        <div className="course--description">
                          <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={courseData.description} onChange={this.change}/></div>
                        </div>
                      </div>
                      <div className="grid-25 grid-right">
                        <div className="course--stats">
                          <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={courseData.estimatedTime} onChange={this.change}/></div>
                            </li>
                            <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={courseData.materialsNeeded} onChange={this.change}/></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        )
    }

    change = (event) => {
      const name = event.target.name
      const value = event.target.value
      console.log(value)
      this.setState(()=>{
        return{
          [name] : value
        }
      })
    }
    submit = (event) => {
      event.preventDefault()
      const updatedCourseData = [
        this.state.title,
        this.state.description,
        this.state.estimatedTime,
        this.state.materialsNeeded
      ]
      this.props.context.actions.updateCourse(updatedCourseData).then(status =>{
        if(status === 204){
          this.props.history.push('/courses')
        }else{
          this.props.history.push('/error')
        }
      })
    }
}