import React from 'react';
import Courses from './components/Courses'
import withContext from './Context'
import CourseDetails from './components/CourseDetails'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import '../src/global.css'
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdataCourse';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header'
import PrivateRoute from './PrivateRoute'
import notFound from './components/NotFound'
import forbidden from './components/forbidden'

const HeaderWithContext = withContext(Header)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignUpWithContext = withContext(UserSignUp)
const UpdateCourseWithContext = withContext(UpdateCourse)
const UserSignOutWithContext = withContext(UserSignOut)
const CreateCourseWithContext = withContext(CreateCourse)
const courseDetailsWithContext = withContext(CourseDetails)

const App = () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/"><Redirect to="/courses"></Redirect></Route>
        <Route exact path="/courses" component={Courses} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={courseDetailsWithContext} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path='/forbidden' component={forbidden} />
        <Route component={notFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App;
