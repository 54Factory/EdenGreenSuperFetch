import React, { Component } from 'react'
//import SearchBar from './Forms/LocationSearchBar';
import NewAccountForm from './Forms/NewAccountForm';


class Create extends Component {

  render() {
    return (
      <div>
        <h1>Create New Account</h1>
        <NewAccountForm />
      </div>
    )
  }
}

export default Create