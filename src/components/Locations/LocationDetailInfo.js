import React, {Component} from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import LocationDetailMap from './locationDetailMap';
import CustomerProfileCard from '../customers/customerProfileCard';

class LocationDetailInfo extends Component {
  state = {
    showMap: false,
    showCustomerCard: false
  }

  componentWillUnmount() {
    this.setState({
      showMap: false,
      showCustomerCard: false
    })
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }
  showCustomerProfileToggle = () => {
    this.setState(prevState => ({
      showCustomerCard: !prevState.showCustomerCard
    }))
  }

  render() {
    const { location } = this.props;
      return (
    <Segment.Group>
      <Segment attached="top">
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="info" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Ownership</span>
          </Grid.Column>
          <Grid.Column width={4}>
              <Button onClick={this.showCustomerProfileToggle} color="blue" size="tiny" content={this.state.showCustomerProfileToggle ? 'Hide Profile' : 'Show Profile'}/>
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showCustomerCard &&
          <CustomerProfileCard profile={location} ownershipId={location.ownershipProfileId}/>}
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Next Pickup or service date</span>
            {/* <span>{location.date}</span> */}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="blue" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{location.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
              <Button onClick={this.showMapToggle} color="blue" size="tiny" content={this.state.showMap ? 'Hide Map' : 'Show Map'}/>
            </Grid.Column>
          </Grid>
        </Segment>
        {this.state.showMap &&
          <LocationDetailMap lat={location.locationLatLng.lat} lng={location.locationLatLng.lng}/>}      </Segment.Group>
  );
  }

};

export default LocationDetailInfo;
