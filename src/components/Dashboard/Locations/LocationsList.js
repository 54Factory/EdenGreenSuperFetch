import React, { Component } from 'react'
import LocationsListItem from './LocationsListItem'

class LocationsList extends Component {
  render() {
    const {locations} = this.props;
    return (
      <div>
        <h1>Locations List</h1>
        {locations.map((location) => (
          <LocationsListItem key={location.id} location={location}/>
        ))}


      </div>
    )
  }
}

export default LocationsList