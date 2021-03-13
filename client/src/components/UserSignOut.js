import { useEffect } from "react";
import { Redirect } from "react-router";

export default ({context}) => {
    useEffect(() => {context.actions.signOut()})
    return(
        <Redirect to="/courses"/>
    )
}