import React, { Component } from 'react'
import './App.css'
import SubscriptionForm from './SubscriptionForm';

class App extends Component {


  constructor(props) {
    super(props);


    this.state = {
      data: "Initial Data...."
    }


    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    this.setState({data: e.target.value});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up for a Subscription!</h1>
        </header>
        <p className="App-intro">
       <SubscriptionForm data = {this.state.data}  updateStateProp = {this.updateState}> </SubscriptionForm>
        </p>
      </div>
    )
  }
}

export default App
