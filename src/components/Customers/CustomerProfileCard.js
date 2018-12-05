import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


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
      <h2>Profile Card</h2>
      {console.log(profile)}
      <Image src={handleProfileCard[0].photoURL}/>
      <Card.Content>
        <Card.Header>{handleProfileCard[0].displayName}</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2015</span>
        </Card.Meta>
        <Card.Description>Sal lives in Philadelphia.</Card.Description>
      </Card.Content>
    </Card>
    )
  }
}

export default CustomerProfileCard