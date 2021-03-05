import React, { Component } from 'react';
import Courses from './components/courses'
import Context from './Context'

class App extends Component {
  constructor(){
    super();
  }

  render(){
    return(
    <div>
      <h1>Working</h1>
      <Courses />
    </div>
    
    )
  }
}

export default App;
