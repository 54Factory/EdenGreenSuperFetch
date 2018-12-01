import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';

const LocationDetailInfo = ({location}) => {
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
            <Button color="blue" size="tiny" content="Show Map" />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default LocationDetailInfo;
