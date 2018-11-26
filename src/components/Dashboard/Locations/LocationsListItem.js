import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import LocationsListServiceGroup from './LocationsListServiceGroup'

class LocationsListItem extends Component {
  render() {
    const {location} = this.props
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={location.locationPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{location.locationName}</Item.Header>
                {
                  location.ownedBy.map((owner) => (
                    <Item.Description key={owner.ownershipProfileId}>
                  Owned by <a href='/#'>{owner.displayName}</a>
                </Item.Description>
                  ))
                }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> Next Service: *from oilCollectionModel*    |
            <Icon name="marker" /> {location.address}
          </span>
        </Segment>
        <Segment secondary>
              <h2>Services</h2>
          <List horizontal>
          {location.services.map((service) => (
            <LocationsListServiceGroup key={service.id} service={service}/>
          ))}

          </List>
        </Segment>
        <Segment clearing>
        {/* <span>{location.description}</span> */}
          <Button as="a" color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default LocationsListItem;
