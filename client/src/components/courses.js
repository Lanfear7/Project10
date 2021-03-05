import React, { Component } from 'react'

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
        console.log(this.state.data)
        return (
            <div>
                <h1>Courses</h1>
                <ul>
                    {
                        this.state.data.map((course) => <li key={course.id}><a href={`http://localhost:3000/courseDetails/${course.id}`}>{course.title}</a></li>)
                    }
                </ul>
            </div>
        )
    }
}
