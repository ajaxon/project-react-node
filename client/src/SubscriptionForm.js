
import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'material-ui-pickers/DatePicker';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import Confirmation from './Confirmation';

class SubscriptionForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            newSubscription: {
                name: '',
                email: '',
                dob: new Date(),
                subscriptionLength: '',
                chosenVehicle: ''

            },
            price: 0,
            open: false,
            created: false,
            vehicleOptions: ['honda', 'acura'],
            subscriptionLengths: [7,24],
            order: {}
        }
    }

    componentWillMount(){
        console.log("Will Mount");
    }
    componentDidMount(){
        fetch('http://localhost:3003/vehicles',{
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {
              if(response.status === 200) {
                response.json().then(data =>{
                    console.log("Successful" + data);
                   
                    this.setState({
                        vehicleOptions: data
                    })
                  })
              }
          
        }).catch(e => {
            console.log(e);
        })
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
              console.log("response ", response);
              if(response.status === 201){
                  this.setState({
                      created: true
                  })
              }
            response.json().then(data =>{
            this.setState({
                order: data
            })
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

    handleDateChange(date){


        this.setState( prevState => {
            return { 
               newSubscription : {
                        ...prevState.newSubscription, dob: date.toISODate()
                       }
            }
         })
    
        }
   

    render() {
        let message;
        console.log("Created" , this.state.created);
        if(this.state.created){
            message = "Successfuly Created Subscription"
        }

        if(this.state.created){
            return(
                <Grid className="grid" direction = "row" container spacing={24}>
        <Grid item xs={4}></Grid>
         <Grid item xs={4}>   <Confirmation order = {this.state.order} /> </Grid>
        <Grid item xs={4} />
        </Grid>
            )
        } else {

       return (

    
        <Grid className="grid" direction = "row" container spacing={24}>
        <Grid item xs={4}></Grid>
           
        <Grid item xs={4} >
        <Card>
            <CardHeader title = "Create New Subscription"/>

            <CardContent>
          <form className="container" onSubmit={this.handleFormSubmit}>
<Grid container direction="column">
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
        <DatePicker
            value = {this.state.newSubscription.dob}
            name={'dob'}
            onChange = {this.handleDateChange}
        />

          <FormControl>
          <InputLabel htmlFor="age-simple">Vehicle</InputLabel>
          <Select
            value={this.state.newSubscription.chosenVehicle}
            onChange={this.handleInput}
            inputProps={{
              name: 'chosenVehicle',
              id: 'age-simple',
            }}
            name = "chosenVehicle"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {this.state.vehicleOptions.map((veh) =>{
                return <MenuItem value={veh._id}>{veh.description}</MenuItem>
            })}
           
          </Select>
        </FormControl>


     <FormControl>
          <InputLabel htmlFor="age-simple">Subscription Length</InputLabel>
          <Select
            value={this.state.newSubscription.subscriptionLength}
            onChange={this.handleInput}
            inputProps={{
              name: 'subscriptionLength',
              id: 'sub-length',
            }}

          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {this.state.subscriptionLengths.map((veh) =>{
                return <MenuItem value={veh}>{veh}</MenuItem>
            })}
           
          </Select>
        </FormControl>
      

<Grid container spaeing={12}>
<Grid item xs={3}/>
<Grid item xs>
     <Button variant = "contained" onClick={this.clearForm} title="Clear Form" > Reset </Button>
     <Button variant = "contained" color = "primary" title="Submit Subscription" onClick = {this.submitForm} > Submit</Button>
</Grid>
<Grid item xs={3} />


     </Grid>
     </Grid>
      </form>
       
       </CardContent>
       </Card>
       </Grid>
       <Grid item xs={6}></Grid>
</Grid>
       )}}
 }



 const Input = (props) => {

    const type = props.type;

    return (  
        <div>

        <TextField

        label = {props.title}
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

const SelectInput = (props) => {
    const options = props.options.map((option) =>{
        console.log(option);
        <option value={option}>{option}</option>
    })
    return(
        
        <Select
            native
            open={true}
          
            label = {props.title}
              name={props.name}
              value={props.value}
              inputProps={{
                name: 'age',
                id: 'age-simple',
              }}
              onChange={props.handleChange}
        >
                 <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
    )
}

 export default SubscriptionForm;