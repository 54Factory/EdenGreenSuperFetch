import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { db } from '../../firebase';
import CustomerForm from './createCustomer'
import LocationForm from '../Locations'

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  error: null
}



class Customers extends Component {
  constructor(props){
    super(props)

    this.state = { ...initialState }

  }
  
  setCustomerState(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({[field]: value})}

  onSubmit = (event) => {
    const {
      firstName,
      lastName,
      phone,
      email,
    } = this.state;
  
  db.createCustomer(firstName, lastName, phone, email)
  event.preventDefault();
    }
  
  render() {
    const { error, firstName, lastName, phone, email } = this.state;
    const isInvalid =
    firstName === '' ||
    lastName === '' ||
    email === '' ||
    phone === '';
    console.log(this.state);
    return (
      <div>
        <h1>New Customer Form</h1>
        <Form onSubmit={this.onSubmit}>
        <CustomerForm
            onChange={this.setCustomerState.bind(this)}
           />
        <LocationForm />
        { error && <p>{error.message}</p> }
        <Form.Button disabled={isInvalid}>Submit</Form.Button>
        </Form>

      </div>
    )
  }
}

export default Customers