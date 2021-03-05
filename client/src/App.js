import React, { Component } from 'react';
import Courses from './components/courses'
import Context from './Context'
import CourseDetails from './components/courseDetails'
import {Route, Switch, BrowserRouter} from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path='/courses/:id' component={CourseDetails} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App;
