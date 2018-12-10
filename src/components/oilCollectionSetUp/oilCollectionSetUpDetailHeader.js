import React from 'react';
import { Segment, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import LocationDetailMap from '../locations/locationDetailMap';
import OilCollectionSetUpForm from '../../crud/Forms/OilCollectionSetUpForm';

const OilCollectionSetUpDetailHeader = ({locationDetails, history}) => {
  console.log(locationDetails);
  
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <LocationDetailMap  lat={locationDetails.locationLatLng.lat} lng={locationDetails.locationLatLng.lng}/>    
      </Segment>
        <Segment basic>
        <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="large"
                  content={locationDetails.locationName}
                  style={{ color: 'black', padding: '3px' }}
                />
                <p>Address: {locationDetails.address}</p>
                <p>Containment: {locationDetails.oilCollectionContainerQuantity} - {
                locationDetails.oilCollectionContainerQuantity <= 1 ? 
                locationDetails.oilCollectionContainerType : `${locationDetails.oilCollectionContainerType}s` }
                </p>
                <OilCollectionSetUpForm setup={locationDetails}/>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment attached="bottom">
      <Button onClick={history.goBack} type="button">Go Back</Button>
      </Segment>
    </Segment.Group>
  );
};

export default OilCollectionSetUpDetailHeader;
