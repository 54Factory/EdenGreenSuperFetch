// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { firestoreConnect, isEmpty } from 'react-redux-firebase';
// import { compose } from 'redux';
// import { Grid } from "semantic-ui-react";
// import { toastr } from 'react-redux-toastr';
// // import UserDetailHeader from './UserDetailHeader'
// // import UserDetailDescription from './UserDetailDescription';
// // import UserDetailPhotos from './UserDetailPhotos';
// // import UserDetailSidebar from './UserDetailSidebar';
// // import UserDetailEvents from './UserDetailEvents';
// import LoadingComponent from '../../../app/layout/LoadingComponent'
// import { oilCollectionSetUpQuery } from '../../firebase/queries/oilCollectionQueries'
// import { getUserEvents, followUser, unfollowUser } from '../userActions';

// const mapState = (state, ownProps) => {
//   // let userUid = null;
//   // let profile = {};

//   // if (ownProps.match.params.id === state.auth.uid) {
//   //   profile = state.firebase.profile
//   // } else {
//   //   profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
//   //   userUid = ownProps.match.params.id;
//   // }
//   // return {
//   //   profile,
//   //   userUid,
//   //   events: state.events,
//   //   eventsLoading: state.async.loading,
//   //   auth: state.firebase.auth,
//   //   photos: state.firestore.ordered.photos,
//   //   requesting: state.firestore.status.requesting,
//   //   following: state.firestore.ordered.following
//   // }
// }

// const actions = {
//   // getUserEvents,
//   // followUser,
//   // unfollowUser
// }
// class OilCollectionSetUpDetailPage extends Component {

//   async componentDidMount() {
//     let setup = await this.props.firestore.get(`oilCollectionSetup/${this.props.match.params.id}`);
//     if (!setup.exists) {
//       toastr.error('Not found', 'This is not the setup you are looking for')
//       this.props.history.push('/error')
//     }
//     let location = await this.props.getSetupLocation(this.props.locationId);
//     console.log(location);
//   }

//   // eslint-disable-next-line no-undef
//   // changeTab = (e, data) => {
//   //   this.props.getUserEvents(this.props.userUid, data.activeIndex)
//   // }

//   render() {
//     const { auth, match, requesting, events} = this.props;
//     //const isCurrentUser = auth.uid === match.params.id;
//     const loading = requesting[`oilCollectionSetup/${match.params.id}`]
//     // const isFollowing = !isEmpty(following)
//     //console.log();
//     //console.log(this.props.following)
    
//     if (loading) return <LoadingComponent inverted={true}/>
//     return (
//       <Grid>
//         {/* <UserDetailHeader profile={profile}/>
//         <UserDetailDescription profile={profile}/>
//         <UserDetailSidebar unfollowUser={unfollowUser} isFollowing={isFollowing} profile={profile} followUser={followUser} isCurrentUser={isCurrentUser}/>
//         {photos && photos.length > 0 &&
//         <UserDetailPhotos photos={photos}/>}
//         <UserDetailEvents changeTab={this.changeTab} events={events} eventsLoading={eventsLoading}/> */}
//       </Grid>
//     );
//   }
// }

// export default compose(
//   connect(mapState, actions),
//   firestoreConnect((auth, userUid, match) => oilCollectionSetUpQuery(auth, userUid, match))
//   )(OilCollectionSetUpDetailPage);


  import React, { Component } from 'react';
  import { Grid } from 'semantic-ui-react';
  import { connect } from 'react-redux';
  import { withFirestore } from 'react-redux-firebase';
  import { toastr } from 'react-redux-toastr'
  import LoadingComponent from '../../helpers/LoadingComponent'
  // import LocationDetailHeader from './locationDetailHeader';
  // import LocationDetailInfo from './locationDetailInfo';
  // import LocationDetailChat from './locationChat';
  // import LocationDetailSidebar from './locationDetailSidebar';
  // import LocationsPhotoPage from './locationPhotosPage';
  // import EventDetailedHeader from './EventDetailedHeader';
  // import EventDetailedInfo from './EventDetailedInfo';
  // import EventDetailedChat from './EventDetailedChat';
  // import EventDetailedSidebar from './EventDetailedSidebar';
  //import { objectToArray } from '../../../app/common/util/helpers';
  //import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
  
  const mapState = (state, ownProps) => {
    let setup = {};
   
    let setupId = ownProps.match.params.id;
    //console.log(setupId);
  
    if (state.firestore.ordered.oilCollectionSetup && state.firestore.ordered.oilCollectionSetup[0]) {
      setup = state.firestore.ordered.oilCollectionSetup.filter(setup => setup.id === setupId)[0];
    }
    //   if (setupId && state.firestore.ordered.setups.length > 0) {
    //   setup = state.setups.filter(setup => setup.id === setupId)[0]
    // }
  
    return {
      requesting: state.firestore.status.requesting,
      loading: state.async.loading,
      setup,
      // auth: state.firebase.auth
    };
  };
   
  // const actions = {
  //   goingToEvent,
  //   cancelGoingToEvent
  // };
  
  class OilCollectionSetUpDetailPage extends Component {
    state = {
      initialLoading: true
    }
  
  
    async componentDidMount() {
      const { firestore, match } = this.props;
      let setup = await firestore.get(`oilCollectionSetup/${match.params.id}`);
      if (!setup.exists) {
        toastr.error('Not found', 'This is not the location you are looking for')
        this.props.history.push('/error')
      }
      await firestore.setListener(`oilCollectionSetup/${match.params.id}`);
      this.setState({
        initialLoading: false,
        setup
      })
    }  
  
    async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`oilCollectionSetup/${match.params.id}`);
    }
  
    render() {
      
      const { match, requesting, setup, } = this.props;
      const loadingLocation = requesting[`oilCollectionSetup/${match.params.id}`]
  
      if (loadingLocation || this.state.initialLoading) return <LoadingComponent inverted={true}/>
  console.log(setup);
  
      return (
        <Grid>
          <Grid.Column width={10}>
          {/* <LocationDetailHeader location={location} />
          <LocationDetailInfo location={location} />
          <LocationDetailChat />
          <LocationsPhotoPage location={location} />
          </Grid.Column>
          <Grid.Column width={6}>
          <LocationDetailSidebar /> */}
        </Grid.Column>
        </Grid>
      );
    }
  }
  // The location needs to be queried to find out the lat lng to get map up and form for completion...
  // 


  // export default compose(
  //   connect(mapState, actions),
  //   firestoreConnect((auth, userUid, match) => userDetailQuery(auth, userUid, match))
  //   )(UserDetailPage);
  //
  export default withFirestore(connect(mapState, {})(OilCollectionSetUpDetailPage));
  