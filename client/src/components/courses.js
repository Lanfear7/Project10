import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
                <div><Link to={`/courses/${course.id}`}>
                    <h3>{course.title}</h3>
                </Link></div>
        </React.Fragment>
        )
        console.log(this.state.data)
        return (
            <div>
                <h1>Courses</h1>
                <ul>
                    {courses}
                </ul>
            </div>
        )
    }
}
