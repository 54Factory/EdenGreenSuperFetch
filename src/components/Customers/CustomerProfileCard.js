import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'


export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

class CustomerProfileCard extends Component {

  render() {
    const { profile } = this.props  
    const handleProfileCard = objectToArray(profile.ownedBy)
    console.log(handleProfileCard);
      
    return (
      <Card>
        <Image src={handleProfileCard[0].photoURL}/>
        <Card.Content>
          <Card.Header>{handleProfileCard[0].displayName}</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}

export default CustomerProfileCard