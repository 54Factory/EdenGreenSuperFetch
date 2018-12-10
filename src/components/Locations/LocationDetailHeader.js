import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const locationImageStyle = {
    filter: 'brightness(30%)'
};

const locationImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const LocationDetailHeader = ({location, history}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image src={location.locationPhotoURL} fluid style={locationImageStyle} />
        {/* <Image src={`/assets/categoryImages/${location.category}.jpg`} fluid style={locationImageStyle} /> */}

        <Segment basic style={locationImageTextStyle}>
        <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={location.locationName}
                  style={{ color: 'white' }}
                />
                {/* <p>{location.date}</p> */}
                <p>Next Pick Up Date:</p>
                <p>
                  Address: <strong>{location.address}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">

        <Button onClick={history.goBack} type="button">Go Back</Button>
        <Button color="blue">Change Something</Button>

        <Button as={Link} to={`/manage/${location.id}`} color="orange" floated="right">
          Manage Location
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default LocationDetailHeader;
