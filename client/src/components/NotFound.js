import React from 'react'
import { Link } from 'react-router-dom'

const notFound = () => {
    return(
    <div>
        <h1>404 - Not Found</h1>
        <Link to="/courses"> Courses </Link>
    </div>
    )
   
}
export default notFound;