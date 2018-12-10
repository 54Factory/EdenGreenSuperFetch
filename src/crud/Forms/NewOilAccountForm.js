import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Container, Header } from 'semantic-ui-react';
import {
  combineValidators,
  isRequired,
} from 'revalidate';
import TextInput from './components/TextInput';
import PlaceInput from './components/PlaceInput';
import DateInput from './components/DateInput';
import { createNewAccount } from '../../redux/actions/create/createNewAccount'
import SingleMarkerMapComponent from '../../components/maps/singleMarkerMap';
import SelectInput from './components/SelectInput';



const mapState = (state, ownProps) => {
  let location = {};

  // if (state.firestore.ordered.locations && state.firestore.ordered.locations[0]) {
  //   location = state.firestore.ordered.locations[0]
  // }

  return {
    initialValues: location,
    location,
    ownProps
  };
};

const actions = {
  createNewAccount
};

const validate = combineValidators({
  firstName: isRequired('firstName'),
  lastName: isRequired('lastName'),
  locationName: isRequired('locationName'),
  address: isRequired('address'),
});


const collectionContainerOptions = [
  { key: '0', text: '55 Gallon Drum', value: "55 Gallon Drum" },
  { key: '1', text: '150 Gallon Dumpster', value: "150 Gallon Dumpster" }
]
const collectionContainerQuantityOptions = [
  { key: '0', text: '1', value: 1 },
  { key: '1', text: '2', value: 2 },
  { key: '2', text: '3', value: 3 }
]

const collectionCycleOptions = [
  { key: '0', text: 'On Call', value: 1 },
  { key: '1', text: 'Every Week', value: 7 },
  { key: '2', text: 'Every 2 Weeks', value: 14 },
  { key: '3', text: 'Every 3 Weeks', value: 21 },
  { key: '4', text: 'Every 4 Weeks', value: 28 },
  { key: '5', text: 'Every 6 Weeks', value: 42 },
  { key: '6', text: 'Every 8 Weeks', value: 54 },
]


class NewOilAccountForm extends Component {
  state = {
    locationLatLng: {},
    geocodeResults: null,
    loading: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handlePlaceSelect = selectedPlace => {
    geocodeByAddress(selectedPlace)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          locationLatLng: latlng,
          geocodeResults: this.renderGeocodeSuccess(latlng.lat, latlng.lng),
        });
      })
    geocodeByAddress(selectedPlace)
      .then(results => {
        let address = results[0].formatted_address
        this.props.change('address', address);
      })
      .then(() => {
        this.props.change('locationName', selectedPlace.split(',')[0]);
        //this.props.change('city', address);
      })
      .catch(error => {
        console.log('Geocode Error', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        })
      })
  };
  
  onFormSubmit = values => {
    values.locationLatLng = this.state.locationLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.locationLatLng).length === 0) {
        values.locationLatLng = this.props.location.locationLatLng
      }
        console.log('Problem');
        
    } else {
      this.props.createNewAccount(values);
      console.log('Submitted'); 
      this.props.ownProps.history.push('/dashboard');
    }
  };
  renderGeocodeFailure(error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {error}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    const markers = {
      lat,
      lng
    }
    return (
      <div>
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude, continue with creating account.{' '}
        <SingleMarkerMapComponent 
          markers={markers}
        />
        <strong>
          {lat}, {lng}
        </strong>

      </div>   
      <div>
        </div>     
      </div>

    )
  }

  render() {
    const { invalid, submitting, pristine, loading } = this.props;
    // console.log(this.props);
    // console.log(this.state);
    
    return (
      <Container style={{margin: "20px", padding: "0px 40px 0px 40px" }}>
          <Segment>   
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub color="grey" content="Location details" />
              <Field
                name="locationName"
                type="text"
                component={PlaceInput}
                placeholder="Find a location"
                onSelect={this.handlePlaceSelect}
              />
        {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
          <div>
            <div className="geocoding-results">{this.state.geocodeResults}</div>
            <Header sub color="grey" content="Address Details" />
            <Field
                name="address"
                type="text"
                component={TextInput}
                placeholder="Location Address"
              /> 
            <Header sub color="grey" content="Ownership Details" />
             <Field
                name="firstName"
                type="text"
                component={TextInput}
                placeholder="First Name"
              />
              <Field
                name="lastName"
                type="text"
                component={TextInput}
                placeholder="Last Name"
              />
            <Header size='medium' color="grey" content="Oil Collection Details" />
            {/* <Header sub color="grey" content="Select Service Schedule Type" /> */}
             <Field
             label="Collection Schedule"
                name="oilCollectionCycle"
                component={SelectInput}
                options={collectionCycleOptions}
                placeholder="Collection Cycle"
              />
             <Field
             label="Container Type"
                name="oilCollectionContainerType"
                component={SelectInput}
                options={collectionContainerOptions}
                placeholder="Container Type"
              />
             <Field
             label="Container Type"
                name="oilCollectionContainerQuantity"
                component={SelectInput}
                options={collectionContainerQuantityOptions}
                placeholder="Container Quantity"
              />
              <Field
                name="oilCollectionSetUpDate"
                type="text"
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Set Up Date"
                todayButton={"Today"}
              />
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button disabled={loading} onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              {/* {event.id &&
              <Button

                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type='button'
                color={event.cancelled ? 'green' : 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />} */}
          </div>
          
        )}

            </Form>
          </Segment>
      </Container>
    );
  }

}

export default withRouter(withFirestore(
  connect(mapState, actions)(
    reduxForm({ form: 'newOilAccountForm', enableReinitialize: true, validate })(
      NewOilAccountForm
    )
  )
));