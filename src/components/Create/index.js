import React, { Component } from 'react'
import NewAccountForm from './Forms/NewAccount';


class Create extends Component {

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Create New Account Form</h1>
        <NewAccountForm />
      </div>
    )
  }
}

export default Create