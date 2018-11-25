import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { db } from '../../firebase';
import CustomerForm from '../Forms/Customers/createCustomer'
import LocationForm from '../Forms/Locations/createLocation'

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  locationName: '',
  error: null
}



class CreateNewCustomer extends Component {
  constructor(props){
    super(props)

    this.state = { ...initialState }

  }
  
  setCustomerState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value})}

  setLocationNameState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value});
  }

  onSubmit = (event) => {
    const {
      firstName,
      lastName,
      phone,
      email,
      locationName
    } = this.state;
  
  db.createCustomer(firstName, lastName, phone, email, locationName)
  // db.createLocation(locationName)
  event.preventDefault();
    }

  
  
  render() {
    const { error, firstName, lastName, phone, email, locationName } = this.state;
    const isInvalid =
    firstName === '' ||
    lastName === '' ||
    email === '' ||
    phone === '' ||
    locationName === '';
    console.log(this.state);
    return (
      <div>
        <h1>Create New Customer Form</h1>
        <Form onSubmit={this.onSubmit}>
        <CustomerForm
            onChange={this.setCustomerState.bind(this)}
           />
        <LocationForm 
          onChange={this.setLocationNameState.bind(this)}
        />
        { error && <p>{error.message}</p> }
        <Form.Button disabled={isInvalid}>Submit</Form.Button>
        </Form>

      </div>
    )
  }
}

export default CreateNewCustomer