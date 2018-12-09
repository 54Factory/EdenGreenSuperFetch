import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import LocationDetailMap from '../locations/locationDetailMap';

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

const OilCollectionSetUpDetailHeader = ({locationDetails}) => {
  console.log(locationDetails);
  
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}></Segment>
        <LocationDetailMap  lat={locationDetails.locationLatLng.lat} lng={locationDetails.locationLatLng.lng}/>
        {/* <Image src={location.locationPhotoURL} fluid style={locationImageStyle} /> */}
        {/* <Image src={`/assets/categoryImages/${location.category}.jpg`} fluid style={locationImageStyle} /> */}

        <Segment basic style={locationImageTextStyle}>
        <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={locationDetails.locationName}
                  style={{ color: 'black' }}
                />
                {/* <p>{location.date}</p> */}
                <p>Next Pick Up Date:</p>
                <p>
                  Address: <strong></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel Something</Button>
        <Button color="blue">Change Something</Button>

        <Button as={Link} to={`/manage/`} color="green" floated="right">
          Complete Set Up
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default OilCollectionSetUpDetailHeader;
