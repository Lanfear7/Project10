import React from 'react'
import { Link } from 'react-router-dom'

const forbidden = () =>{
    return(
        <div>
        <h1>Forbidden Route</h1>
        <Link to="/courses"> Courses </Link>
    </div>
    )
}

export default forbidden;
