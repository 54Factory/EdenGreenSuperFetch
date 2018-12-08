import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';

class LocationsListItem extends Component {
  render() {
    const { location } = this.props
    console.log(this.props);
    
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={location.locationPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{location.locationName}</Item.Header>
                {
                  location.ownedBy && Object.values(location.ownedBy).map((owner, index) => (
                    <Item.Description key={index}>
                  Owned by <a href='/#'>{owner.displayName}</a>
                </Item.Description>
                  ))
                }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          {location.oilCollectionSetUpDate === null ? (
          <span>
          <Icon name="clock" color="red"/> 
          Next Service:    
          <Label color='red' horizontal>
          Pending Set Up...
          </Label>    |
          <Icon name="marker" /> {location.address}
        </span>
          ) : (
            <span>
            <Icon name="clock" /> Next Service: *from oilCollectionModel*    |
            <Icon name="marker" /> {location.address}
          </span>           
          )}

        </Segment>
        <Segment secondary>
              <p>Services</p>
          <List horizontal>
          {/* {location.services.map((service) => (
            <LocationsListServiceGroup key={service.id} service={service}/>
          ))} */}

          </List>
        </Segment>
        <Segment secondary>
              <p>Recent Pickups</p>
          <List horizontal>
          {/* {location.services.map((service) => (
            <LocationsListServiceGroup key={service.id} service={service}/>
          ))} */}

          </List>
        </Segment>
        <Segment clearing>
        {/* <span>{location.description}</span> */}
        <Button as={Link} to={`/locations/${location.id}`} color="blue" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default LocationsListItem;
