import React, {Component} from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import LocationDetailMap from './LocationDetailMap';

class LocationDetailInfo extends Component {
  state = {
    showMap: false
  }

  componentWillUnmount() {
    this.setState({
      showMap: false
    })
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  render() {
    const { location } = this.props;
      return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="blue" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            {/* <p>{location.description}</p> */}
            <p>Some Detail Info</p>
          </Grid.Column>
        </Grid>
      </Segment>
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
