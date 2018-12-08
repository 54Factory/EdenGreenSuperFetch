import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteLocation } from '../../../redux/actions/locations';
import LocationsList from '../locationsList';
import LoadingComponent from '../../../helpers/LoadingComponent';
//import OilCollectionSetUpList from '../../oilCollectionSetUp/oilCollectionSetUpList';

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
        <Grid.Column width={6}>
        <Header sub color="grey" content="Locations List" />
          <LocationsList deleteEvent={this.handleDeleteEvent} locations={locations} />
        </Grid.Column>
        <Grid.Column width={6}>
        <Header sub color="grey" content="Set Up List" />
        {/* <OilCollectionSetUpList deleteEvent={this.handleDeleteEvent} locations={locations} /> */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(
  firestoreConnect([{ collection: 'locations' }])(LocationsDashboard)
);
