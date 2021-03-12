import { useEffect } from "react";
import { Redirect } from "react-router";

export default ({context}) => {
    console.log(context.actions)
    useEffect(() => {context.actions.signOut()})
    return(
        <Redirect to="/courses"/>
    )
}