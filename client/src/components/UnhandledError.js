import React from 'react'
import { Link } from 'react-router-dom'

const unhandledError = () =>{
    return(
        <div>
        <h1>UnhandledError</h1>
        <Link to="/courses"> Courses </Link>
    </div>
    )
}

export default unhandledError;