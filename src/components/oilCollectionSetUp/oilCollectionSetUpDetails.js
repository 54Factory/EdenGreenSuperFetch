import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';

import { toastr } from 'react-redux-toastr';
import LoadingComponent from '../../helpers/LoadingComponent'
import { oilCollectionSetUpQuery } from '../../firebase/queries/oilCollectionQueries';
import OilCollectionSetUpDetailHeader from './oilCollectionSetUpDetailHeader'

  
  const mapState = (state, ownProps) => {
    let setup = {};
    let setupLocation = {};
    let locationId;
    let setupId = ownProps.match.params.id;
  
    if (state.firestore.ordered.oilCollectionSetup && state.firestore.ordered.oilCollectionSetup[0]) {
      setup = state.firestore.ordered.oilCollectionSetup.filter(setup => setup.id === setupId)[0];
      locationId = setup.locationId;
    }
    if (state.firestore.ordered.locationDetails) {
      setupLocation = state.firestore.ordered.locationDetails[0]
    }
  
    return {
      requesting: state.firestore.status.requesting,
      loading: state.async.loading,
      setup,
      locationId,
      setupLocation
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

      // let setupLocation = await firestore.get(`locations/${locationId}`);
      // if (!setupLocation.exists) {
      //   toastr.error('Not found', 'This is not the location you are looking for')
      //   this.props.history.push('/error')
      // }
      // await firestore.setListener(`locations/${locationId}`);
      // this.setState({
      //   initialLoading: false,
      //   setupLocation
      // })
    }  
  
    async componentWillUnmount() {
      const { firestore, match, locationId } = this.props;
      await firestore.unsetListener(`oilCollectionSetup/${match.params.id}`);
      await firestore.unsetListener(`locations/${locationId}`);
    }
  
    render() {
      
      const { match, requesting, setup, locationId, setupLocation} = this.props;
      const loadingSetup = requesting[`oilCollectionSetup/${match.params.id}`]
      const loadingLocation = requesting[`locations/${locationId}`]
  
      if (loadingSetup || loadingLocation || this.state.initialLoading) return <LoadingComponent inverted={true}/>
        console.log(setup, setupLocation);
      // if (loadingLocation || this.state.initialLoading) return <LoadingComponent inverted={true}/>
      //   console.log(setup);
  
      return (
        <Grid>
          <Grid.Column width={10}>
            <OilCollectionSetUpDetailHeader locationDetails={setupLocation}/>
        </Grid.Column>
        </Grid>
      );
    }
  }
  
  export default compose(
    connect(mapState, {}),
    withFirestore,
    firestoreConnect((locationId) => 
    oilCollectionSetUpQuery(locationId))
  )(OilCollectionSetUpDetailPage)