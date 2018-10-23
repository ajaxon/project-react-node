import React, { Component } from 'react'
import './App.css'
import SubscriptionForm from './SubscriptionForm';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import LuxonUtils from 'material-ui-pickers/utils/luxon-utils';

import Header from './Header';

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
      <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Header/>
      <div className="App">
        <header className="App-header">
          
        </header>
        <p className="App-intro">
        <main>
       <SubscriptionForm data = {this.state.data}  updateStateProp = {this.updateState}> </SubscriptionForm>
        </main>
        </p>
      </div>
      </MuiPickersUtilsProvider>
    )
  }
}

export default App
