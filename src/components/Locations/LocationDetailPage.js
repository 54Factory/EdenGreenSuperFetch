import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr'
import LoadingComponent from '../../helpers/LoadingComponent'
import LocationDetailHeader from './locationDetailHeader';
import LocationDetailInfo from './locationDetailInfo';
import LocationDetailChat from './locationChat';
import LocationDetailSidebar from './locationDetailSidebar';
import LocationsPhotoPage from './locationPhotosPage';
// import EventDetailedHeader from './EventDetailedHeader';
// import EventDetailedInfo from './EventDetailedInfo';
// import EventDetailedChat from './EventDetailedChat';
// import EventDetailedSidebar from './EventDetailedSidebar';
//import { objectToArray } from '../../../app/common/util/helpers';
//import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';

const mapState = (state, ownProps) => {
  let location = {};
 
  let locationId = ownProps.match.params.id;
  //console.log(locationId);

  if (state.firestore.ordered.locations && state.firestore.ordered.locations[0]) {
    location = state.firestore.ordered.locations.filter(location => location.id === locationId)[0];
  }
  //   if (locationId && state.firestore.ordered.locations.length > 0) {
  //   location = state.locations.filter(location => location.id === locationId)[0]
  // }

  return {
    requesting: state.firestore.status.requesting,
    loading: state.async.loading,
    location,
    // auth: state.firebase.auth
  };
};
 
// const actions = {
//   goingToEvent,
//   cancelGoingToEvent
// };

class LocationDetailPage extends Component {
  state = {
    initialLoading: true
  }


  async componentDidMount() {
    const { firestore, match } = this.props;
    let location = await firestore.get(`locations/${match.params.id}`);
    if (!location.exists) {
      toastr.error('Not found', 'This is not the location you are looking for')
      this.props.history.push('/error')
    }
    await firestore.setListener(`locations/${match.params.id}`);
    this.setState({
      initialLoading: false,
      location
    })
  }  

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`locations/${match.params.id}`);
  }

  render() {
    
    const { match, requesting, location, } = this.props;
    const loadingLocation = requesting[`locations/${match.params.id}`]

    if (loadingLocation || this.state.initialLoading) return <LoadingComponent inverted={true}/>

    return (
      <Grid>
        <Grid.Column width={10}>
        <LocationDetailHeader location={location} />
        <LocationDetailInfo location={location} />
        <LocationDetailChat />
        <LocationsPhotoPage location={location} />
        </Grid.Column>
        <Grid.Column width={6}>
        <LocationDetailSidebar />
      </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState, {})(LocationDetailPage));
