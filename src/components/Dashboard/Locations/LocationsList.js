import React, { Component } from 'react'
import LocationsListItem from './LocationsListItem'


class LocationsList extends Component {
  render() {
    const { locations, deleteLocation } = this.props;
    return (
      <div>
        {locations && locations.map(location => (
          <LocationsListItem
            key={location.id}
            location={location}
            deleteLocation={deleteLocation}
          />
        ))}
      </div>
    );
  }
}

export default LocationsList;
