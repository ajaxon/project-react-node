
import React, { Component } from 'react'
class SubscriptionForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.state = {
            newSubscription: {
                name: '',
                email: '',
                dob: '',
                subscriptionLength: '',
                chosenVehicle: ''

            },

            vehicleOptions: []
        }
    }
    

    submitForm(e){
        e.preventDefault();
        let subscription = this.state.newSubscription;
    
        fetch('http://localhost:3002',{
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {
            response.json().then(data =>{
              console.log("Successful" + data);
            })
        })
    }

    clearForm(e){
        e.preventDefault();
        this.setState({ 
          newSubscription: {
            name: '',
            email: '',
            dob: '',
            subscriptionLength: '',
            chosenVehicle: ''
          },
        })
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        console.log(name)
        this.setState( prevState => {
           return { 
              newSubscription : {
                       ...prevState.newSubscription, [name]: value
                      }
           }
        }, () => console.log(this.state.newSubscription)
        )
    }
   

    render() {
       return (
          <form className="container" onSubmit={this.handleFormSubmit}>

        <Input type={'text'} title={'Name'} name={'name'}
        value = {this.state.newSubscription.name} 
        placeholder = "Enter your name" 
        handleChange = {this.handleInput}/> {/* Name of the user */}
        <Input type = {'text'}
            name = {'email'}
            title = {'Email'}
            value = {this.state.newSubscription.email}
            handleChange = {this.handleInput}
            placeholder = "Enter your email"/> {/* Input for Age */} 
     

     <Button title="Clear Form"
        action = {this.clearForm}
        />

    <Button title="Submit Subscription" action = {this.submitForm} />
      </form>
       );
    }
 }



 const Input = (props) => {
    return (  
  <div className="form-group">
    <label htmlFor={props.name} className="form-label">{props.title}</label>
    <input
      className="form-input"
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
    />
  </div>
)
}

const Button = (props) => {
    console.log(props.style);
    return(
        <button 
            style= {props.style} 
            onClick= {props.action}>    
            {props.title} 
        </button>)
}

 export default SubscriptionForm;