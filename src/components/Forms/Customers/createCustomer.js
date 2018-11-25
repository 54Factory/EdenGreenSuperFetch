import React, { Component } from 'react';

import { Form } from 'semantic-ui-react'


class CustomerForm extends Component {

  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }
  render() {
    return (
      <Form.Group widths='equal'>
        <Form.Input 
          fluid 
          label='First name' 
          placeholder='First name'
          onChange={this.onFieldChange.bind(this)}
          type="text"
          name="firstName" 
        />
        <Form.Input 
          fluid 
          label='Last name' 
          placeholder='Last name'
          onChange={this.onFieldChange.bind(this)}
          type="text"
          name="lastName" 
        />
        <Form.Input 
          fluid 
          label='Email' 
          placeholder='Email'
          onChange={this.onFieldChange.bind(this)}
          type="text"
          name="email" 
        />
        <Form.Input 
          fluid 
          label='Phone' 
          placeholder='Phone'
          onChange={this.onFieldChange.bind(this)}
          type="text"
          name="phone" 
        />
      </Form.Group>
    );
  }
}

export default CustomerForm;

