import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import LocationsList from './Locations/LocationsList'
//import EventForm from '../EventForm/EventForm';

const locationsDashboard = [
  {
    id: 'GvwziOTU4iOXtbRqac5e',
    locationName: 'Pyramids Pizza ',
    date: '2018-03-27T11:00:00+00:00',
    address: '916 Kerlin St',
    city: 'Chester',
    state: "PA",
    zip: "19013",
    ownershipProfileId: 'J3qW08dh08xrTo7f6QaH',
    locationPhotoURL: "assets/pizza_pyramids_1250235.jpg",
    services: [
      {
        id: 'a',
        name: 'Oil Collection',
        photoURL: 'assets/Recycled-Cooking-Oil-1.jpg'
      }
    ],
    ownedBy: [      
      {
        ownershipProfileId: 'J3qW08dh08xrTo7f6QaH',
        displayName: "Seth Mantooth",
        photoURL: 'assets/userPhoto.jpg'
      }]
    
  }
];

class Dashboard extends Component {
  state = {
    locations: locationsDashboard,
    isOpen: false
  };

  // handleFormOpen = () => {
  //   this.setState({
  //     isOpen: true
  //   });
  // };

  // handleCancel = () => {
  //   this.setState({
  //     isOpen: false
  //   });
  // };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <LocationsList locations={this.state.locations} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Dashboard;
