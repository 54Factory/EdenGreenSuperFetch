import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
//import OilCollectionListItem from '../../../components/oilCollectionSetUp/oilCollectionSetUpListItem'
import LoadingComponent from '../../../helpers/LoadingComponent';
import OilCollectionSetUpList from '../../../components/oilCollectionSetUp/oilCollectionSetUpList';

const mapState = state => ({
  setups: state.firestore.ordered.oilCollectionSetup,
  requesting: state.firestore.status.requesting
});

class OilCollectionSetUpPage extends Component {

  render() {
    const { requesting, setups } = this.props;
    const loading = requesting['oilCollectionSetup']
    console.log(this.props);
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={6}>
        <Header sub color="grey" content="Set Up List" />
          <OilCollectionSetUpList setups={setups}/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, null)(
  firestoreConnect([{ collection: 'oilCollectionSetup' }])(OilCollectionSetUpPage)
);
