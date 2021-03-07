import React from 'react';
import Courses from './components/Courses'
import withContext from './Context'
import CourseDetails from './components/CourseDetails'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import '../src/global.css'
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UpdateCourse from './components/UpdataCourse';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header'

const HeaderWithContext = withContext(Header)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignUpWithContext = withContext(UserSignUp)

const App = () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/courses" component={Courses} />
        <Route path="/courses.create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetails} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOut} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App;
