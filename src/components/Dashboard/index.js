import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteLocation } from '../../redux/actions/locations';
import LocationsList from './Locations/LocationsList';
import LoadingComponent from '../../helpers/LoadingComponent';

const mapState = state => ({
  locations: state.firestore.ordered.locations,
  loading: state.async.loading
});

const actions = {
  deleteLocation
};

class LocationsDashboard extends Component {
  handleDeleteEvent = locationId => () => {
    this.props.deleteEvent(locationId);
  };

  render() {
    const { locations, loading } = this.props;
    // console.log(this.props);
    
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
        <Header sub color="grey" content="Dashboard" />
          <LocationsList deleteEvent={this.handleDeleteEvent} locations={locations} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>Side Column</h1>
          <h1>Pickup Feed Component</h1>

        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(
  firestoreConnect([{ collection: 'locations' }])(LocationsDashboard)
);
