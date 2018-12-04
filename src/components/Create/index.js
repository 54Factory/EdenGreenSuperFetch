import React, { Component } from 'react'
//import SearchBar from './Forms/LocationSearchBar';
import NewAccountForm from './Forms/NewAccountForm';


import { Container, Header, Segment } from 'semantic-ui-react'

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}
class Create extends Component {

  render() {
    return (
      <div>
        <Header as='h1' textAlign='left' style={style.h1} content='Create Account' />
        <Container>
          <Segment.Group>
            <Segment><NewAccountForm /></Segment>
          </Segment.Group>
        </Container>
      </div>
    )
  }
}

export default Create