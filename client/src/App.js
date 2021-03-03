import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then(data => console.log(data))

  }

  render(){
    return(
    <div>
      <h1>Working</h1>
    </div>
    
    )
  }
}

export default App;
