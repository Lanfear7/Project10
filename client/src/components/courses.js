import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
    state = { 
        data: [],
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/courses')
        .then(res => res.json())
        .then(courses => this.setState({data: courses
        }))
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        const courses = this.state.data.map((course) => 
        <React.Fragment key={course.id}>
                <div className="grid-33">
                    <Link className="course--module course--link" to={`/courses/${course.id}`}>
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                </div>
        </React.Fragment>
        )
        console.log(this.state.data)
        return (
            <div className="root">
                <div className="bounds">
                    {courses}
                    <div className="grid-33"><a className="course--module course--add--module" href="create-course.html">
                      <h3 class="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                          viewBox="0 0 13 13" class="add">
                          <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
