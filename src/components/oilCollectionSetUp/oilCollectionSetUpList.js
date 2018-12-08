import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase';
import { List } from 'semantic-ui-react'
import dateFormat from 'dateformat'
import LoadingComponent from '../../helpers/LoadingComponent';


const mapState = (state, ownProps) => {
  let setup = {};

  return {
    requesting: state.firestore.status.requesting,
    setup
  }

}

 class OilCollectionSetUpList extends Component {

  render() {
    const { setups } = this.props;
    if (!setups) return <LoadingComponent inverted={true}/>
    console.log() 
    console.log(setups);
    return (
      <List divided relaxed>
      {setups.map((setup) => (
      <List.Item key={setup.id}>
      <List.Icon name='clock' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{setup.locationName}</List.Header>
        <List.Description>Container Details: {setup.oilCollectionContainerQuantity} - {
          setup.oilCollectionContainerQuantity <= 1 ? 
          setup.oilCollectionContainerType : `${setup.oilCollectionContainerType}s` 
        }
        </List.Description>
        <List.Description>{(
          dateFormat(new Date(setup.oilCollectionSetUpDate.seconds*1000), "mmmm dS, yyyy h:MM TT")    
          )}</List.Description>

      </List.Content>
    </List.Item>
      ))}
    </List>
    )
  }
}


export default withFirestore(connect(mapState, {})(OilCollectionSetUpList))
