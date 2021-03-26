import { useEffect } from "react";
import { Redirect } from "react-router";

const UserSignOut = ({context}) => {
    useEffect(() => {context.actions.signOut()})
    return(
        <Redirect to="/courses"/>
    )
}
export default UserSignOut