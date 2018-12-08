import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react'

class LocationsListServiceGroup extends Component {
  render() {
    const {service} = this.props;
    return (
      <List.Item>
        <Image as='a' size="mini" circular src={service.photoURL}/>
      </List.Item>
    )
  }
}

export default LocationsListServiceGroup